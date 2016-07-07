package ch.rasc;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import ch.rasc.forcastio.FioClient;
import ch.rasc.forcastio.model.FioBlock;
import ch.rasc.forcastio.model.FioDataPoint;
import ch.rasc.forcastio.model.FioRequest;
import ch.rasc.forcastio.model.FioResponse;
import ch.rasc.forcastio.model.FioUnit;

public class Main {

	public static void main(String[] args) throws IOException {

		FioRequest request = FioRequest.builder().latitude("46.93011019999999")
				.longitude("7.5635394")
				.excludeBlock(FioBlock.ALERTS, FioBlock.MINUTELY, FioBlock.HOURLY)
				.unit(FioUnit.SI).build();

		FioClient client = new FioClient(args[0]);
		FioResponse response = client.forecastCall(request);

		for (FioDataPoint dataPoint : response.daily().data()) {
			ZoneId zoneId = ZoneId.of(response.timezone());
			Instant instant = Instant.ofEpochSecond(dataPoint.time());
			LocalDateTime time = LocalDateTime.ofInstant(instant, zoneId);
			
			System.out.print(time);
			System.out.print(": ");
			System.out.println(dataPoint.summary());			
		}
		
		request = FioRequest.builder().latitude("46.93011019999999")
				.longitude("7.5635394")
				.unit(FioUnit.SI).build();

		client = new FioClient(args[0]);
		response = client.forecastCall(request);
		System.out.println(response);
		
		request = FioRequest.builder().latitude("46.93011019999999")
				.longitude("7.5635394")
				.extendHourly(true)
				.unit(FioUnit.SI).build();

		client = new FioClient(args[0]);
		response = client.forecastCall(request);
		System.out.println(response);

	}
}
