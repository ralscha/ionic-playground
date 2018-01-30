package ch.rasc.backgroundgeo;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import ch.rasc.sse.eventbus.SseEventBus;

@Controller
public class EventBusController {

	private final SseEventBus eventBus;

	private final ApplicationEventPublisher publisher;

	public EventBusController(SseEventBus eventBus, ApplicationEventPublisher publisher) {
		this.eventBus = eventBus;
		this.publisher = publisher;
	}

	@CrossOrigin
	@GetMapping("/register/{id}")
	public SseEmitter eventbus(@PathVariable("id") String id, HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-store");
		return this.eventBus.createSseEmitter(id);
	}

	@CrossOrigin
	@ResponseBody
	@GetMapping("/unregister/{id}")
	public void unregister(@PathVariable("id") String id) {
		this.eventBus.unregisterClient(id);
	}

	@CrossOrigin
	@ResponseBody
	@GetMapping("/subscribe/{id}/{event}")
	public void subscribe(@PathVariable("id") String id,
			@PathVariable("event") String event) {
		String[] splittedEvents = event.split(",");
		for (String e : splittedEvents) {
			this.eventBus.subscribe(id, e);
			this.publisher.publishEvent(SubscribeEvent.of(id, e));
		}
	}

	@CrossOrigin
	@ResponseBody
	@GetMapping("/unsubscribe/{id}/{event}")
	public void unsubscribe(@PathVariable("id") String id,
			@PathVariable("event") String event) {
		String[] splittedEvents = event.split(",");
		for (String e : splittedEvents) {
			this.eventBus.unsubscribe(id, e);
		}
	}

}
