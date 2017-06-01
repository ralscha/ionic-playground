package ch.rasc.hotel.controller;

import java.time.LocalDate;

import ch.rasc.hotel.entity.RoomType;

public class Filter {
	private RoomType roomType;
	private int guests;
	private int beds;
	private PriceRange priceRange;
	private LocalDate from;
	private LocalDate to;

	public RoomType getRoomType() {
		return this.roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public int getGuests() {
		return this.guests;
	}

	public void setGuests(int guests) {
		this.guests = guests;
	}

	public int getBeds() {
		return this.beds;
	}

	public void setBeds(int beds) {
		this.beds = beds;
	}

	public PriceRange getPriceRange() {
		return this.priceRange;
	}

	public void setPriceRange(PriceRange priceRange) {
		this.priceRange = priceRange;
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
