package ch.rasc.push;

import java.util.List;

import org.immutables.value.Value;
import org.immutables.value.Value.Style.ImplementationVisibility;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Value.Immutable
@Value.Style(depluralize = true, visibility = ImplementationVisibility.PACKAGE)
@JsonInclude(Include.NON_NULL)
@JsonDeserialize(as = ImmutableFcmNotification.class)
public interface FcmNotification {

	@Nullable
	String title();

	@Nullable
	String body();

	@Nullable
	String icon();

	@Nullable
	String sound();

	@Nullable
	String tag();

	@Nullable
	String color();

	@Nullable
	String badge();

	@Nullable
	@JsonProperty("click_action")
	String clickAction();

	@Nullable
	@JsonProperty("body_loc_key")
	String bodyLocKey();

	@Nullable
	@JsonProperty("body_loc_args")
	List<String> bodyLocArgs();

	@Nullable
	@JsonProperty("title_loc_key")
	String titleLocKey();

	@Nullable
	@JsonProperty("title_loc_args")
	List<String> titleLocArgs();

	public static Builder builder() {
		return new Builder();
	}

	public static final class Builder extends ImmutableFcmNotification.Builder {
		// nothing here
	}
}
