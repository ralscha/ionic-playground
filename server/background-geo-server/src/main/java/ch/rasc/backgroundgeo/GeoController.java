package ch.rasc.backgroundgeo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ch.rasc.sse.eventbus.SseEvent;

@RestController
public class GeoController {

	private final ApplicationEventPublisher publisher;
	private final List<Position> positions;
	private final List<Stationary> stationaries;
	private final ObjectMapper objectMapper;

	public GeoController(ApplicationEventPublisher publisher, ObjectMapper objectMapper) {
		this.publisher = publisher;
		this.positions = new ArrayList<>();
		this.stationaries = new ArrayList<>();
		this.objectMapper = objectMapper;
	}

	@EventListener
	public void onSubscribe(SubscribeEvent event) throws JsonProcessingException {
		if (event.name().equals("pos")) {
			if (!this.positions.isEmpty()) {
				this.publisher.publishEvent(SseEvent.builder()
						.addClientId(event.clientId()).event("pos")
						.data(this.objectMapper.writeValueAsString(this.positions)));
			}
		}
		else if (event.name().equals("stationary")) {
			if (!this.stationaries.isEmpty()) {
				this.publisher.publishEvent(SseEvent.builder()
						.addClientId(event.clientId()).event("stationary")
						.data(this.objectMapper.writeValueAsString(this.stationaries)));
			}
		}
	}

	@DeleteMapping(path = "/clear")
	public void clear() {
		this.stationaries.clear();
		this.positions.clear();
		this.publisher.publishEvent(SseEvent.ofEvent("clear"));
	}

	@PostMapping(path = "/pos")
	public void handleLocation(@RequestBody Position position)
			throws JsonProcessingException {
		this.publisher.publishEvent(SseEvent.of("pos",
				this.objectMapper.writeValueAsString(Collections.singleton(position))));

		this.positions.add(position);
		if (this.positions.size() > 100) {
			this.positions.remove(0);
		}
	}

	@PostMapping(path = "/stationary")
	public void handleStationary(@RequestBody Stationary stationary)
			throws JsonProcessingException {
		this.publisher.publishEvent(SseEvent.of("stationary",
				this.objectMapper.writeValueAsString(Collections.singleton(stationary))));

		this.stationaries.add(stationary);
		if (this.stationaries.size() > 10) {
			this.stationaries.remove(0);
		}
	}

	@PostMapping(path = "/clienterror")
	public void handleError(String errorMessage) {
		Application.logger.error(errorMessage);
	}

}
