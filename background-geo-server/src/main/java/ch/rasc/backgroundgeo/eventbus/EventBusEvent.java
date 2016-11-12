package ch.rasc.backgroundgeo.eventbus;

import java.util.Collections;
import java.util.Set;

import javax.annotation.Nullable;

import org.immutables.value.Value;
import org.immutables.value.Value.Style.ImplementationVisibility;

@Value.Style(visibility = ImplementationVisibility.PACKAGE)
@Value.Immutable(copy = false, builder = false)
public interface EventBusEvent {

	@Value.Parameter
	@Nullable
	Set<String> clientIds();

	@Value.Parameter
	String name();

	@Value.Parameter
	@Nullable
	Object data();

	/**
	 * true: combine data with previous unsent messages false: overwrite previous unsent
	 * messages
	 */
	@Value.Parameter
	boolean combine();

	public static EventBusEvent all(String name) {
		return ImmutableEventBusEvent.of(Collections.emptySet(), name, "", false);
	}

	public static EventBusEvent all(String name, Object data) {
		return ImmutableEventBusEvent.of(Collections.emptySet(), name, nullToEmpty(data),
				false);
	}

	public static EventBusEvent all(String name, Object data, boolean combine) {
		return ImmutableEventBusEvent.of(Collections.emptySet(), name, nullToEmpty(data),
				combine);
	}

	public static EventBusEvent one(String clientId, String name) {
		return ImmutableEventBusEvent.of(Collections.singleton(clientId), name, "",
				false);
	}

	public static EventBusEvent one(String clientId, String name, Object data) {
		return ImmutableEventBusEvent.of(Collections.singleton(clientId), name,
				nullToEmpty(data), false);
	}

	public static EventBusEvent one(String clientId, String name, Object data,
			boolean combine) {
		return ImmutableEventBusEvent.of(Collections.singleton(clientId), name,
				nullToEmpty(data), combine);
	}

	public static EventBusEvent group(Set<String> clientIds, String name) {
		return ImmutableEventBusEvent.of(clientIds, name, "", false);
	}

	public static EventBusEvent group(Set<String> clientIds, String name, Object data) {
		return ImmutableEventBusEvent.of(clientIds, name, nullToEmpty(data), false);
	}

	public static EventBusEvent group(Set<String> clientIds, String name, Object data,
			boolean combine) {
		return ImmutableEventBusEvent.of(clientIds, name, nullToEmpty(data), combine);
	}

	static Object nullToEmpty(Object data) {
		if (data == null) {
			return "";
		}
		return data;
	}
}
