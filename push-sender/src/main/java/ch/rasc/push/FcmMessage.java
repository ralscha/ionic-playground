package ch.rasc.push;

import java.util.List;

import org.immutables.value.Value;
import org.immutables.value.Value.Style.ImplementationVisibility;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

//https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream-http-messages-json
@Value.Immutable
@Value.Style(depluralize = true, visibility = ImplementationVisibility.PACKAGE)
@JsonInclude(Include.NON_NULL)
@JsonDeserialize(as = ImmutableFcmMessage.class)
public interface FcmMessage {
	@Nullable
	String to();

	@Nullable
	@JsonProperty("registration_ids")
	List<String> registrationIds();

	@Nullable
	String condition();

	@Nullable
	@JsonProperty("collapse_key")
	String collapseKey();

	@Nullable
	@JsonSerialize(using = FcmPrioritySerializer.class)
	FcmPriority priority();

	@Nullable
	@JsonProperty("content_available")
	Boolean contentAvailable();

	@Nullable
	@JsonProperty("delay_while_idle")
	Boolean delayWhileIdle();

	@Nullable
	@JsonProperty("time_to_live")
	Integer timeToLive();

	@Nullable
	@JsonProperty("restricted_package_name")
	String restrictedPackageName();

	@Nullable
	@JsonProperty("dry_run")
	Boolean dryRun();

	@Nullable
	Object data();

	@Nullable
	FcmNotification notification();

	public static Builder builder() {
		return new Builder();
	}

	public static final class Builder extends ImmutableFcmMessage.Builder {
		// nothing here
	}
}
