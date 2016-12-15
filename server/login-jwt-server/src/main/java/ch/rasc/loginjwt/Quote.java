package ch.rasc.loginjwt;

import org.immutables.value.Value;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Value.Immutable
@JsonInclude(Include.NON_NULL)
@JsonSerialize(as = ImmutableQuote.class)
public interface Quote {
	int id();

	String joke();
}
