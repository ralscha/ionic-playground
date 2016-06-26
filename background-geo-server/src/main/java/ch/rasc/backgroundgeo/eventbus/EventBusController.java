package ch.rasc.backgroundgeo.eventbus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
public class EventBusController {

	private final EventBus eventBus;

	public EventBusController(EventBus eventBus) {
		this.eventBus = eventBus;
	}

	@CrossOrigin
	@GetMapping("/subscribe/{id}")
	public SseEmitter eventbus(@PathVariable("id") String id) {
		SseEmitter emitter = new SseEmitter(180_000L);
		emitter.onTimeout(() -> onComplete(emitter, id));
		emitter.onCompletion(() -> onComplete(emitter, id));

		this.eventBus.subscribe(EventBusClient.of(id, emitter));
		return emitter;
	}

	@CrossOrigin
	@GetMapping("/unsubscribe/{id}")
	public void unsubscribe(@PathVariable("id") String id) {
		this.eventBus.unsubscribe(id);
	}

	private void onComplete(SseEmitter emitter, String id) {
		this.eventBus.unsubscribe(id);
		emitter.complete();
	}

}
