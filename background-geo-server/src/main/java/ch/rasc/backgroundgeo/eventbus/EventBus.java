package ch.rasc.backgroundgeo.eventbus;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.jodah.expiringmap.ExpiringMap;

@Component
public class EventBus {

	private final Map<String, EventBusClient> clients; // client id -> EventBusClient

	private final Map<String, Integer> failedClients; // client id -> number of failed
														// connection tries

	private final Map<String, Set<String>> eventSubscribers; // eventName -> collection of
																// client ids

	private final Map<String, List<EventBusEvent>> pendingAllEvents; // eventName -> list
																		// of events

	private final Map<String, List<EventBusEvent>> pendingClientEvents; // client id ->
																		// list of events

	private final ObjectMapper objectMapper;

	public EventBus(ObjectMapper objectMapper) {
		this.clients = ExpiringMap.builder().expiration(1, TimeUnit.DAYS)
				.expirationListener(this::expirationListener).build();

		this.objectMapper = objectMapper;
		this.failedClients = new ConcurrentHashMap<>();
		this.eventSubscribers = new ConcurrentHashMap<>();

		this.pendingAllEvents = ExpiringMap.builder().expiration(2, TimeUnit.MINUTES)
				.build();
		this.pendingClientEvents = ExpiringMap.builder().expiration(2, TimeUnit.MINUTES)
				.build();
	}

	private void expirationListener(final String clientId,
			@SuppressWarnings("unused") final EventBusClient client) {
		Set<String> emptyEvents = new HashSet<>();
		for (Map.Entry<String, Set<String>> entry : this.eventSubscribers.entrySet()) {
			Set<String> clientIds = entry.getValue();
			clientIds.remove(clientId);
			if (clientIds.isEmpty()) {
				emptyEvents.add(entry.getKey());
			}
		}
		emptyEvents.forEach(this.eventSubscribers::remove);
		this.failedClients.remove(clientId);
		this.pendingClientEvents.remove(clientId);
	}

	public void registerClient(EventBusClient client) {
		this.clients.put(client.id(), client);
		this.failedClients.remove(client.id());
	}

	public void unregisterClient(String clientId) {
		this.expirationListener(clientId, null);
		this.clients.remove(clientId);
	}

	public void subscribe(String clientId, String event) {
		this.eventSubscribers.computeIfAbsent(event, k -> new HashSet<>()).add(clientId);
	}

	public void unsubscribe(String clientId, String event) {
		Set<String> clientIds = this.eventSubscribers.get(event);
		if (clientIds != null) {
			clientIds.remove(clientId);
			if (clientIds.isEmpty()) {
				this.eventSubscribers.remove(event);
			}
		}

		List<EventBusEvent> clientEvents = this.pendingClientEvents.get(clientIds);
		if (clientEvents != null) {
			Iterator<EventBusEvent> it = clientEvents.iterator();
			while (it.hasNext()) {
				EventBusEvent ebe = it.next();
				if (ebe.name().equals(event)) {
					it.remove();
				}
			}
			if (clientEvents.isEmpty()) {
				this.pendingClientEvents.remove(clientIds);
			}
		}
	}

	@EventListener
	public void handleEvent(EventBusEvent event) {
		if (event.clientIds().isEmpty()) {
			if (event.combine()) {
				this.pendingAllEvents
						.computeIfAbsent(event.name(), k -> new ArrayList<>()).add(event);
			}
			else {
				List<EventBusEvent> events = new ArrayList<>();
				events.add(event);
				this.pendingAllEvents.put(event.name(), events);
			}
		}
		else {
			for (String clientId : event.clientIds()) {
				this.pendingClientEvents.computeIfAbsent(clientId, k -> new ArrayList<>())
						.add(event);
			}
		}
	}

	@Scheduled(fixedDelay = 200)
	public void eventLoop() {
		if (this.eventSubscribers.isEmpty()) {
			return;
		}

		Iterator<Entry<String, List<EventBusEvent>>> it = this.pendingAllEvents.entrySet()
				.iterator();
		while (it.hasNext()) {
			Map.Entry<String, List<EventBusEvent>> entry = it.next();
			sendMessagesToAll(entry.getKey(), entry.getValue());
			it.remove();
		}

		it = this.pendingClientEvents.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry<String, List<EventBusEvent>> entry = it.next();
			sendMessagesToClient(entry.getKey(), entry.getValue());
			it.remove();
		}

		this.failedClients.entrySet().stream().filter(e -> e.getValue() > 20)
				.forEach(e -> {
					unregisterClient(e.getKey());
				});
	}

	private void sendMessagesToClient(String clientId, List<EventBusEvent> events) {
		EventBusClient client = this.clients.get(clientId);
		if (client != null) {
			Map<String, List<EventBusEvent>> eventNameEvents = events.stream()
					.collect(Collectors.groupingBy(EventBusEvent::name));

			SseEventBuilder sseBuilder = SseEmitter.event();
			try {
				for (Entry<String, List<EventBusEvent>> ene : eventNameEvents
						.entrySet()) {
					sseBuilder.name(ene.getKey());
					if (events.size() == 1) {
						sseBuilder.data(this.objectMapper
								.writeValueAsString(events.get(0).data()));
					}
					else {
						sseBuilder.data(this.objectMapper.writeValueAsString(
								events.stream().map(EventBusEvent::data)
										.collect(Collectors.toList())));
					}
				}
			}
			catch (JsonProcessingException e) {
				LoggerFactory.getLogger(getClass()).error("event bus publish", e);
			}

			try {
				client.emitter().send(sseBuilder);
			}
			catch (Exception e) {
				client.emitter().completeWithError(e);
				this.failedClients.merge(clientId, 1, (v, vv) -> v + 1);
			}

		}
	}

	private void sendMessagesToAll(String eventName, List<EventBusEvent> events) {
		Set<String> clientIds = this.eventSubscribers.get(eventName);
		if (clientIds == null || clientIds.isEmpty()) {
			return;
		}

		SseEventBuilder sseBuilder = SseEmitter.event().name(eventName);
		try {
			if (events.size() == 1) {
				sseBuilder
						.data(this.objectMapper.writeValueAsString(events.get(0).data()));
			}
			else {
				sseBuilder.data(this.objectMapper.writeValueAsString(events.stream()
						.map(EventBusEvent::data).collect(Collectors.toList())));
			}
		}
		catch (JsonProcessingException e) {
			LoggerFactory.getLogger(getClass()).error("event bus publish", e);
		}

		for (Map.Entry<String, EventBusClient> entry : this.clients.entrySet()) {
			EventBusClient client = entry.getValue();
			try {
				client.emitter().send(sseBuilder);
			}
			catch (Exception e) {
				client.emitter().completeWithError(e);
				int noOfTries = this.failedClients.merge(entry.getKey(), 1,
						(v, vv) -> v + 1);
				if (noOfTries == 1) {
					this.pendingClientEvents
							.computeIfAbsent(client.id(), k -> new ArrayList<>())
							.addAll(events);
				}
			}
		}

	}

}
