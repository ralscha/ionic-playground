package ch.rasc.weather;

import javax.annotation.Nullable;

import org.immutables.value.Value;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Value.Immutable
@JsonInclude(Include.NON_NULL)
@JsonSerialize(as = ImmutableGeocode.class)
public interface Geocode {

	boolean successful();

	@Nullable
	String name();

	@Nullable
	String latitude();

	@Nullable
	String longitude();

	@Nullable
	String city();

	@Nullable
	String state();
}
