package ch.rasc.hotel.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import ch.rasc.bsoncodec.annotation.BsonDocument;
import ch.rasc.bsoncodec.annotation.Id;

@BsonDocument
@JsonInclude(Include.NON_NULL)
public class Room {

	@Id(generator = UUIDStringGenerator.class)
	private String id;

	private int roomNumber;

	private RoomType type;

	private int beds;

	private int maxOccupancy;

	private int costPerNight;

	private List<Reservation> reserved;

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getRoomNumber() {
		return this.roomNumber;
	}

	public void setRoomNumber(int roomNumber) {
		this.roomNumber = roomNumber;
	}

	public RoomType getType() {
		return this.type;
	}

	public void setType(RoomType type) {
		this.type = type;
	}

	public int getBeds() {
		return this.beds;
	}

	public void setBeds(int beds) {
		this.beds = beds;
	}

	public int getMaxOccupancy() {
		return this.maxOccupancy;
	}

	public void setMaxOccupancy(int maxOccupancy) {
		this.maxOccupancy = maxOccupancy;
	}

	public int getCostPerNight() {
		return this.costPerNight;
	}

	public void setCostPerNight(int costPerNight) {
		this.costPerNight = costPerNight;
	}

	public List<Reservation> getReserved() {
		return this.reserved;
	}

	public void setReserved(List<Reservation> reserved) {
		this.reserved = reserved;
	}

}
