package ch.rasc.loginjwt;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

@RestController
public class QuoteController {

	private final OkHttpClient httpClient;

	private final ObjectMapper objectMapper;

	public QuoteController(ObjectMapper objectMapper) {
		this.httpClient = new OkHttpClient();
		this.objectMapper = objectMapper;
	}

	@CrossOrigin
	@GetMapping("/quote")
	public Quote getQuote() throws IOException {
		IcndbResponse response = getQuote(false);
		if (response.type().equals("success")) {
			return ImmutableQuote.builder().id(response.value().id())
					.joke(response.value().joke()).build();
		}
		return ImmutableQuote.builder().id(-1).joke("error").build();
	}

	@CrossOrigin
	@GetMapping("/secure-quote")
	public Quote getSecureQuote() throws IOException {
		IcndbResponse response = getQuote(true);
		if (response.type().equals("success")) {
			return ImmutableQuote.builder().id(response.value().id())
					.joke(response.value().joke()).build();
		}
		return ImmutableQuote.builder().id(-1).joke("error").build();
	}

	private IcndbResponse getQuote(boolean secret) throws IOException {
		HttpUrl.Builder urlBuilder = new HttpUrl.Builder().scheme("https")
				.host("api.icndb.com").addPathSegment("jokes").addPathSegment("random");

		if (secret) {
			urlBuilder.addQueryParameter("firstName", "James")
					.addQueryParameter("lastName", "Bond");
		}

		Request getRequest = new Request.Builder().get().url(urlBuilder.build()).build();

		try (Response response = this.httpClient.newCall(getRequest).execute(); ResponseBody body = response.body()) {
			if (body != null) {
				String jsonData = body.string();
				return this.objectMapper.readValue(jsonData, IcndbResponse.class);
			}
			return null;
		}

	}

}
