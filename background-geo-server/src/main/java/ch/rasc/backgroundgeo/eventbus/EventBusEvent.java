package ch.rasc.backgroundgeo.eventbus;

import javax.annotation.Nullable;

import org.immutables.value.Value;
import org.immutables.value.Value.Style.ImplementationVisibility;

@Value.Style(visibility = ImplementationVisibility.PACKAGE)
@Value.Immutable(copy = false, builder = false)
public interface EventBusEvent {
	@Value.Parameter
	@Nullable
	String clientId();

	@Value.Parameter
	String name();

	@Value.Parameter
	@Nullable
	Object data();

	public static EventBusEvent of(String name) {
		return ImmutableEventBusEvent.of(null, name, null);
	}

	public static EventBusEvent of(String name, Object data) {
		return ImmutableEventBusEvent.of(null, name, data);
	}

	public static EventBusEvent of(String clientId, String name, Object data) {
		return ImmutableEventBusEvent.of(clientId, name, data);
	}
}
