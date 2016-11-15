package ch.rasc.realty;

import javax.annotation.Nullable;

import org.immutables.value.Value;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Value.Immutable
@JsonSerialize(as = ImmutableProperty.class)
@JsonDeserialize(as = ImmutableProperty.class)
public interface Property {

	int id();

	String city();

	String state();
	
	@Nullable
	String zip();

	String price();

	String title();

	int beds();

	int baths();

	int likes();

	@Nullable()
	Integer sqft();
	
	int broker();

	String pic();

	String thumb();

	String description();

}
