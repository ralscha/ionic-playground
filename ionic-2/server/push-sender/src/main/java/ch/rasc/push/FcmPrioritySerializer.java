package ch.rasc.push;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class FcmPrioritySerializer extends JsonSerializer<FcmPriority> {

	@Override
	public void serialize(FcmPriority value, JsonGenerator jgen,
			SerializerProvider provider) throws IOException {
		jgen.writeString(value.name().toLowerCase());
	}
}