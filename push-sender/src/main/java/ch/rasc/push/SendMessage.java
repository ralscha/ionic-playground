package ch.rasc.push;

import java.io.IOException;
import java.util.Collections;

public class SendMessage {

	public static void main(String[] args) throws IOException {
		FcmClient client = new FcmClient(args[0]);

		FcmNotification notification = FcmNotification.builder()
				.title("Notification title").body("Notification body").sound("default")
				.clickAction("FCM_PLUGIN_ACTIVITY").icon("fcm_push_icon").build();

		FcmMessage message = FcmMessage.builder().to("/topics/topicExample")
				.priority(FcmPriority.HIGH).restrictedPackageName("")
				.notification(notification)
				.data(Collections.singletonMap("param", "data")).build();

		Object response = client.send(message);
		// topic response: {"message_id":5105716265446342527}
		// to with registration id:
		// {"multicast_id":4754672793461993623,"success":1,"failure":0,"canonical_ids":0,"results":[{"message_id":"0:1467780698011012%43903d8943903d89"}]}
		System.out.println(response);
	}

}
