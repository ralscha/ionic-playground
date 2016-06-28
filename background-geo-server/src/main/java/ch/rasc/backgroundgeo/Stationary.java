package ch.rasc.backgroundgeo;

import org.immutables.value.Value;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Value.Immutable
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(as = ImmutableStationary.class)
@JsonDeserialize(as = ImmutableStationary.class)
public interface Stationary {

	double latitude();

	double longitude();

	double radius();
}
