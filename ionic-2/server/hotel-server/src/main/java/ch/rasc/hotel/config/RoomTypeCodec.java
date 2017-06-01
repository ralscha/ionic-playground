package ch.rasc.hotel.config;

import org.bson.BsonReader;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;

import ch.rasc.hotel.entity.RoomType;

public class RoomTypeCodec implements Codec<RoomType> {

	@Override
	public void encode(BsonWriter writer, RoomType value, EncoderContext encoderContext) {
		writer.writeString(value.name());
	}

	@Override
	public Class<RoomType> getEncoderClass() {
		return RoomType.class;
	}

	@Override
	public RoomType decode(BsonReader reader, DecoderContext decoderContext) {
		throw new UnsupportedOperationException();
	}

}
