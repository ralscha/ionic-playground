package ch.rasc.realty;

import org.immutables.value.Value;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Value.Immutable
@JsonSerialize(as = ImmutableBroker.class)
@JsonDeserialize(as = ImmutableBroker.class)
public interface Broker {

	int id();

	String firstName();

	String lastName();

	String title();

	String phone();

	String mobilePhone();

	String email();

	String picture();

}
