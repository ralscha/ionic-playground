package ch.rasc.loginjwt;

import org.immutables.value.Value;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Value.Immutable
@JsonInclude(Include.NON_NULL)
@JsonDeserialize(as = ImmutableIcndbResponse.class)
public interface IcndbResponse {
	String type();
	
	IcndbValue value();
	
}
