package ch.rasc.loginjwt;

import org.immutables.value.Value;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Value.Immutable
@JsonInclude(Include.NON_NULL)
@JsonDeserialize(as = ImmutableSignupRequest.class)
public interface SignupRequest {
	String username();

	String password();
}
