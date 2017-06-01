package ch.rasc.hotel.controller;

import java.time.LocalDate;

public class NewReservation {
	private String roomId;
	private LocalDate from;
	private LocalDate to;

	public String getRoomId() {
		return this.roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

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
