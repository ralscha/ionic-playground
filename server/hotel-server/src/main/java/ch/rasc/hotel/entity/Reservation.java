package ch.rasc.hotel.entity;

import java.time.LocalDate;

import ch.rasc.bsoncodec.annotation.BsonDocument;

@BsonDocument
public class Reservation {
	private LocalDate from;

	private LocalDate to;

	public LocalDate getFrom() {
		return this.from;
	}

	public void setFrom(LocalDate from) {
		this.from = from;
	}

	public LocalDate getTo() {
		return this.to;
	}

	public void setTo(LocalDate to) {
		this.to = to;
	}

}
