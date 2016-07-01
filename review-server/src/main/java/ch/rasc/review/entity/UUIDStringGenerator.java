package ch.rasc.review.entity;

import java.util.UUID;

import org.bson.codecs.IdGenerator;

public class UUIDStringGenerator implements IdGenerator {

	@Override
	public Object generate() {
		return UUID.randomUUID().toString();
	}

}
