package ch.rasc.weather;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.AddressComponent;
import com.google.maps.model.AddressComponentType;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;

import ch.rasc.darksky.DsClient;
import ch.rasc.darksky.model.DsBlock;
import ch.rasc.darksky.model.DsForecastRequest;
import ch.rasc.darksky.model.DsResponse;
import ch.rasc.darksky.model.DsUnit;

@RestController
public class WeatherController {
	private final AppConfig appConfig;
	private final DsClient dsClient;

	public WeatherController(AppConfig appConfig) {
		this.appConfig = appConfig;
		this.dsClient = new DsClient(appConfig.getDarkskyApiKey());
	}

	@CrossOrigin
	@GetMapping("/geocode")
	public Geocode geocode(@RequestParam("address") String address) throws Exception {

		GeoApiContext context = new GeoApiContext.Builder()
				.apiKey(this.appConfig.getGoogleMapApiKey()).build();
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
	@GetMapping("/reverseGeocode")
	public Geocode reverseGeocode(@RequestParam("lat") double lat,
			@RequestParam("lng") double lng) throws Exception {

		GeoApiContext context = new GeoApiContext.Builder()
				.apiKey(this.appConfig.getGoogleMapApiKey()).build();
		LatLng latLng = new LatLng(lat, lng);
		GeocodingResult[] results = GeocodingApi.reverseGeocode(context, latLng).await();
		if (results != null && results.length > 0) {
			String city = null;
			String state = null;

			for (AddressComponent adrCmp : results[0].addressComponents) {
				if (adrCmp.types[0].equals(AddressComponentType.LOCALITY)) {
					city = adrCmp.longName;
				}
				else if (adrCmp.types[0]
						.equals(AddressComponentType.ADMINISTRATIVE_AREA_LEVEL_1)) {
					state = adrCmp.longName;
				}
			}

			return ImmutableGeocode.builder().successful(true).city(city).state(state)
					.build();
		}

		return ImmutableGeocode.builder().successful(false).build();
	}

	@CrossOrigin
	@GetMapping("/forecast")
	public DsResponse forecast(@RequestParam("lat") String latitude,
			@RequestParam("lng") String longitude) throws Exception {

		DsForecastRequest request = DsForecastRequest.builder().latitude(latitude)
				.longitude(longitude)
				.excludeBlock(DsBlock.ALERTS, DsBlock.MINUTELY, DsBlock.HOURLY)
				.unit(DsUnit.SI).build();

		return this.dsClient.sendForecastRequest(request);
	}

}
