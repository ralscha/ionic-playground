package ch.rasc.weather;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "app")
@Component
public class AppConfig {
	private String forecastioApiKey;
	private String googleMapApiKey;

	public String getForecastioApiKey() {
		return forecastioApiKey;
	}

	public void setForecastioApiKey(String forecastioApiKey) {
		this.forecastioApiKey = forecastioApiKey;
	}

	public String getGoogleMapApiKey() {
		return googleMapApiKey;
	}

	public void setGoogleMapApiKey(String googleMapApiKey) {
		this.googleMapApiKey = googleMapApiKey;
	}

}
