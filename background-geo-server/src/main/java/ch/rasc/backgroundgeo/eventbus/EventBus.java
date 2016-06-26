package ch.rasc.backgroundgeo.eventbus;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ch.rasc.backgroundgeo.Application;

@Component
public class EventBus {

	private final Map<String, EventBusClient> clients;

	private final ObjectMapper objectMapper;

	@Autowired
	public EventBus(ObjectMapper objectMapper) {
		this.clients = new ConcurrentHashMap<>();
		this.objectMapper = objectMapper;
	}

	public void subscribe(EventBusClient client) {
		this.clients.put(client.id(), client);
	}

	public void unsubscribe(String clientId) {
		this.clients.remove(clientId);
	}

	@EventListener
	public void handleEvent(EventBusEvent event) {
		if (clients.isEmpty()) {
			return;
		}

		String data = null;
		try {
			data = this.objectMapper.writeValueAsString(event.data());
		}
		catch (JsonProcessingException e) {
			Application.logger.error("event bus publish", e);
			return;
		}

		final String json = data;
		Set<String> failedClients = new HashSet<>();

		clients.forEach((clientId, client) -> {
			if (client != null) {
				try {
					client.emitter().send(SseEmitter.event().name("pos").data(json));
				}
				catch (Exception e) {
					failedClients.add(client.id());
				}
			}
			else {
				failedClients.add(clientId);
			}
		});

		failedClients.forEach(this.clients::remove);
	}

}
