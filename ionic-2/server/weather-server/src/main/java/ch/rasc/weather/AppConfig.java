package ch.rasc.weather;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "app")
@Component
public class AppConfig {
	private String darkskyApiKey;
	private String googleMapApiKey;

	public String getDarkskyApiKey() {
		return this.darkskyApiKey;
	}

	public void setDarkskyApiKey(String darkskyApiKey) {
		this.darkskyApiKey = darkskyApiKey;
	}

	public String getGoogleMapApiKey() {
		return this.googleMapApiKey;
	}

	public void setGoogleMapApiKey(String googleMapApiKey) {
		this.googleMapApiKey = googleMapApiKey;
	}

}
