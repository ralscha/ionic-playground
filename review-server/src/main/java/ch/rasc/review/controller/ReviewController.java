package ch.rasc.review.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;

import ch.rasc.review.config.MongoDb;
import ch.rasc.review.entity.CReview;
import ch.rasc.review.entity.Review;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ReviewController {

	private final MongoDb mongoDb;

	public ReviewController(MongoDb mongoDb) {
		this.mongoDb = mongoDb;
	}

	@GetMapping("/reviews")
	public List<Review> read() {
		return toList(this.mongoDb.getCollection(Review.class).find());
	}

	@PostMapping("/reviews")
	public String save(@RequestBody Review review) {
		this.mongoDb.getCollection(Review.class).insertOne(review);
		return review.getId();
	}

	@DeleteMapping("/reviews/{reviewId}")
	public void delete(@PathVariable("reviewId") String reviewId) {
		this.mongoDb.getCollection(Review.class)
				.deleteOne(Filters.eq(CReview.id, reviewId));
	}

	private static <T> List<T> toList(FindIterable<T> iterable) {
		return StreamSupport.stream(iterable.spliterator(), false)
				.collect(Collectors.toList());
	}

}
