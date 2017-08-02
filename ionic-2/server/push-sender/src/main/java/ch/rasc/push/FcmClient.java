package ch.rasc.push;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class FcmClient {

	private final static MediaType JSON_MEDIA_TYPE = MediaType
			.parse("application/json; charset=utf-8");
	private final static String FCM_URL = "https://fcm.googleapis.com/fcm/send";

	private final String authorizationKey;

	private final OkHttpClient httpClient;

	private final ObjectMapper om;

	public FcmClient(String authorizationKey) {
		this(authorizationKey, new ObjectMapper(), new OkHttpClient());
	}

	public FcmClient(String authorizationKey, ObjectMapper om) {
		this(authorizationKey, om, new OkHttpClient());
	}

	public FcmClient(String authorizationKey, ObjectMapper om, OkHttpClient httpClient) {
		this.authorizationKey = authorizationKey;
		this.om = om;
		this.httpClient = httpClient;
	}

	public Object send(FcmMessage message) throws IOException {

		String json = this.om.writeValueAsString(message);
		RequestBody requestBody = RequestBody.create(JSON_MEDIA_TYPE, json);
		Request request = new Request.Builder().url(FCM_URL).post(requestBody)
				.addHeader("Authorization", "key=" + this.authorizationKey).build();

		try (Response response = this.httpClient.newCall(request).execute();ResponseBody body = response.body()) {
			if (body != null) {
				return body.string();
			}
			return null;
		}

	}

}
