package ch.rasc.hotel.config;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Component;

import com.mongodb.client.MongoCollection;

import ch.rasc.hotel.entity.Reservation;
import ch.rasc.hotel.entity.Room;
import ch.rasc.hotel.entity.RoomType;

@Component
class Startup {

	private final MongoDb mongoDb;

	public Startup(MongoDb mongoDb) {
		this.mongoDb = mongoDb;
		init();
	}

	private void init() {

		MongoCollection<Room> roomCollection = this.mongoDb.getCollection(Room.class);
		if (roomCollection.countDocuments() == 0) {

			Random rnd = new Random();
			for (int i = 0; i < 150; i++) {
				Room newRoom = new Room();
				newRoom.setType(RoomType.values()[rnd.nextInt(RoomType.values().length)]);
				newRoom.setBeds(rnd.nextInt(6) + 1);
				newRoom.setCostPerNight(rnd.nextInt(450) + 50);
				newRoom.setMaxOccupancy(rnd.nextInt(8) + 1);
				newRoom.setRoomNumber(i + 1);

				newRoom.setReserved(createTestReservations());
				roomCollection.insertOne(newRoom);
			}
		}

	}

	private static List<Reservation> createTestReservations() {
		List<Reservation> reservations = new ArrayList<>();

		Reservation res = new Reservation();
		res.setFrom(LocalDate.of(1970, 1, 1));
		res.setTo(LocalDate.of(1970, 1, 2));
		reservations.add(res);

		res = new Reservation();
		res.setFrom(LocalDate.of(2017, 4, 18));
		res.setTo(LocalDate.of(2017, 4, 23));
		reservations.add(res);

		res = new Reservation();
		res.setFrom(LocalDate.of(2018, 1, 29));
		res.setTo(LocalDate.of(2018, 1, 30));
		reservations.add(res);

		return reservations;
	}

}
