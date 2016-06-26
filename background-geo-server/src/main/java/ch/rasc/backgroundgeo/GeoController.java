package ch.rasc.backgroundgeo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeoController {

	@PostMapping(path="/pos")
	public void consumeLocation(@RequestBody Position position) {
		System.out.println(position);
	}
	
	@PostMapping(path="/error")
	public void consumeLocation(String errorMessage) {
		System.out.println("Error: " + errorMessage);
	}
	
	
}
