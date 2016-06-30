package ch.rasc.weather;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;

import ch.rasc.forcastio.FioClient;
import ch.rasc.forcastio.model.FioBlock;
import ch.rasc.forcastio.model.FioRequest;
import ch.rasc.forcastio.model.FioResponse;
import ch.rasc.forcastio.model.FioUnit;
import ch.rasc.forcastio.model.ImmutableFioRequest;

@RestController
public class WeatherController {
	private final AppConfig appConfig;
	private final FioClient fioClient;

	public WeatherController(AppConfig appConfig) {
		this.appConfig = appConfig;
		this.fioClient = new FioClient(appConfig.getForecastioApiKey());
	}

	@CrossOrigin
	@GetMapping("/geocode")
	public Geocode geocode(@RequestParam("address") String address) throws Exception {

		GeoApiContext context = new GeoApiContext()
				.setApiKey(appConfig.getGoogleMapApiKey());
		GeocodingResult[] results = GeocodingApi.geocode(context, address).await();
		if (results != null && results.length > 0) {
			return ImmutableGeocode.builder().successful(true)
					.name(results[0].formattedAddress)
					.longitude(String.valueOf(results[0].geometry.location.lng))
					.latitude(String.valueOf(results[0].geometry.location.lat)).build();
		}

		return ImmutableGeocode.builder().successful(false).build();

	}

	@CrossOrigin
	@GetMapping("/forecast")
	public FioResponse forecast(@RequestParam("lat") String latitude,
			@RequestParam("lng") String longitude) throws Exception {

		FioRequest request = ImmutableFioRequest.builder().latitude(latitude)
				.longitude(longitude)
				.addExcludeBlock(FioBlock.ALERTS, FioBlock.MINUTELY, FioBlock.HOURLY)
				.unit(FioUnit.SI).build();

		return this.fioClient.forecastCall(request);
	}

}
