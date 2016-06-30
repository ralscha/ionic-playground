package ch.rasc;

import java.io.IOException;

import ch.rasc.forcastio.FioClient;
import ch.rasc.forcastio.model.FioBlock;
import ch.rasc.forcastio.model.FioRequest;
import ch.rasc.forcastio.model.FioResponse;
import ch.rasc.forcastio.model.FioUnit;
import ch.rasc.forcastio.model.ImmutableFioRequest;

public class Main {

	public static void main(String[] args) throws IOException {

		FioRequest request = ImmutableFioRequest.builder().latitude("46.93011019999999")
				.longitude("7.5635394")
				.addExcludeBlock(FioBlock.ALERTS, FioBlock.MINUTELY, FioBlock.HOURLY)
				.unit(FioUnit.SI).build();

		FioClient client = new FioClient(args[0]);
		FioResponse response = client.forecastCall(request);
		System.out.println(response);

		
		
		request = ImmutableFioRequest.builder().latitude("46.93011019999999")
				.longitude("7.5635394")
				.unit(FioUnit.SI).build();

		client = new FioClient(args[0]);
		response = client.forecastCall(request);
		System.out.println(response);
		
		request = ImmutableFioRequest.builder().latitude("46.93011019999999")
				.longitude("7.5635394")
				.extendHourly(true)
				.unit(FioUnit.SI).build();

		client = new FioClient(args[0]);
		response = client.forecastCall(request);
		System.out.println(response);

	}
}
