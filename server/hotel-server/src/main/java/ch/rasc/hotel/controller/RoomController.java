package ch.rasc.hotel.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.conversions.Bson;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

import ch.rasc.hotel.config.MongoDb;
import ch.rasc.hotel.entity.CReservation;
import ch.rasc.hotel.entity.CRoom;
import ch.rasc.hotel.entity.Reservation;
import ch.rasc.hotel.entity.Room;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class RoomController {

	private final MongoDb mongoDb;

	public RoomController(MongoDb mongoDb) {
		this.mongoDb = mongoDb;
	}

	@PostMapping("/rooms")
	public List<Room> read(@RequestBody Filter filter) {
		List<Bson> filters = new ArrayList<>();
		if (filter.getBeds() > 0) {
			filters.add(Filters.eq(CRoom.beds, filter.getBeds()));
		}
		if (filter.getGuests() > 0) {
			filters.add(Filters.gt(CRoom.maxOccupancy, filter.getGuests()));
		}
		if (filter.getPriceRange() != null) {
			filters.add(
					Filters.gte(CRoom.costPerNight, filter.getPriceRange().getLower()));
			filters.add(
					Filters.lte(CRoom.costPerNight, filter.getPriceRange().getUpper()));
		}
		if (filter.getRoomType() != null) {
			filters.add(Filters.eq(CRoom.type, filter.getRoomType()));
		}
		if (filter.getTo() != null && filter.getFrom() != null) {
			Bson f = Filters.and(Filters.lt(CReservation.from, filter.getTo()),
					Filters.gt(CReservation.to, filter.getFrom()));
			filters.add(Filters.not(Filters.elemMatch(CRoom.reserved, f)));
		}

		return toList(this.mongoDb.getCollection(Room.class).find(Filters.and(filters)));
	}

	@PostMapping("/rooms/reserve")
	public void reserve(@RequestBody NewReservation newReservation) {
		Reservation res = new Reservation();
		res.setFrom(newReservation.getFrom());
		res.setTo(newReservation.getTo());

		this.mongoDb.getCollection(Room.class).updateOne(
				Filters.eq(CRoom.id, newReservation.getRoomId()),
				Updates.push(CRoom.reserved, res));
	}

	private static <T> List<T> toList(FindIterable<T> iterable) {
		return StreamSupport.stream(iterable.spliterator(), false)
				.collect(Collectors.toList());
	}

}
