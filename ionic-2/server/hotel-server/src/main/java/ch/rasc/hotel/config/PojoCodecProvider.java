package ch.rasc.hotel.config;

import org.bson.codecs.Codec;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;

import ch.rasc.hotel.entity.Reservation;
import ch.rasc.hotel.entity.ReservationCodec;
import ch.rasc.hotel.entity.Room;
import ch.rasc.hotel.entity.RoomCodec;
import ch.rasc.hotel.entity.UUIDStringGenerator;

public final class PojoCodecProvider implements CodecProvider {
	private final UUIDStringGenerator uUIDStringGenerator;

	public PojoCodecProvider() {
		this(new UUIDStringGenerator());
	}

	public PojoCodecProvider(final UUIDStringGenerator uUIDStringGenerator) {
		this.uUIDStringGenerator = uUIDStringGenerator;
	}

	@Override
	@SuppressWarnings("unchecked")
	public <T> Codec<T> get(final Class<T> clazz, final CodecRegistry registry) {
		if (clazz.equals(Reservation.class)) {
			return (Codec<T>) new ReservationCodec(registry);
		}
		if (clazz.equals(Room.class)) {
			return (Codec<T>) new RoomCodec(registry, this.uUIDStringGenerator);
		}

		return null;
	}
}
