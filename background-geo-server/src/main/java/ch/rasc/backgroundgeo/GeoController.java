package ch.rasc.backgroundgeo;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
		System.out.println("consumeLocation");
		publisher.publishEvent(EventBusEvent.of("pos", position));
	}
	
	@PostMapping(path = "/stationary")
	public void consumeStationary(@RequestBody Position position) {
		System.out.println("consumeStationary");
		publisher.publishEvent(EventBusEvent.of("stationary", position));
	}	

	@PostMapping(path = "/clienterror")
	public void consumeError(String errorMessage) {
		System.out.println("consumeError");
		Application.logger.error(errorMessage);
	}

	@PostMapping(path = "/tracking")
	public void tracking(@RequestParam Map<String,String> allRequestParams, HttpServletRequest request) {
		System.out.println(request.getQueryString());
		request.getParameterMap().forEach((k,v)->{
			System.out.println(k+"->"+v);
		});
		System.out.println("tracking");
		allRequestParams.forEach((k,v)->{
			System.out.println(k+"->"+v);
		});
	}
}
