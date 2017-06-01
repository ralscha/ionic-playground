package ch.rasc.hotel.config;

import org.bson.codecs.configuration.CodecRegistries;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;

import ch.rasc.bsoncodec.time.LocalDateDateCodec;

@Configuration
@EnableConfigurationProperties(value = { MongoProperties.class })
public class MongoConfig {

	@Bean
	public MongoClient mongoClient(MongoProperties properties) {
		MongoClientURI uri = new MongoClientURI(properties.getUri());
		return new MongoClient(uri);
	}

	@Bean
	public MongoDatabase mongoDatabase(MongoClient mongoClient,
			MongoProperties properties) {
		MongoClientURI uri = new MongoClientURI(properties.getUri());
		return mongoClient.getDatabase(uri.getDatabase())
				.withCodecRegistry(CodecRegistries.fromRegistries(
						CodecRegistries.fromCodecs(new LocalDateDateCodec(),
								new RoomTypeCodec()),
						MongoClient.getDefaultCodecRegistry(),
						CodecRegistries.fromProviders(new PojoCodecProvider())));
	}

}
