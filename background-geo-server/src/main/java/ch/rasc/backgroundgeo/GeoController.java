package ch.rasc.backgroundgeo;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ch.rasc.backgroundgeo.eventbus.EventBusEvent;

@RestController
public class GeoController {

	private final ApplicationEventPublisher publisher;

	public GeoController(ApplicationEventPublisher publisher) {
		this.publisher = publisher;
	}

	@PostMapping(path = "/pos")
	public void consumeLocation(@RequestBody Position position) {
		publisher.publishEvent(EventBusEvent.of(position));
	}

	@PostMapping(path = "/clienterror")
	public void consumeLocation(String errorMessage) {
		Application.logger.error(errorMessage);
	}

}
