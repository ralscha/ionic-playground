package ch.rasc.backgroundgeo.eventbus;

import javax.annotation.Nullable;

import org.immutables.value.Value;
import org.immutables.value.Value.Style.ImplementationVisibility;

@Value.Style(visibility = ImplementationVisibility.PACKAGE)
@Value.Immutable(copy = false, builder = false)
public interface EventBusEvent {
	@Value.Parameter
	@Nullable
	Object data();

	public static EventBusEvent of(Object data) {
		return ImmutableEventBusEvent.of(data);
	}
}
