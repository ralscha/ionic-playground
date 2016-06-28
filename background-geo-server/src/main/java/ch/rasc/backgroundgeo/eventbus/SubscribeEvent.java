package ch.rasc.backgroundgeo.eventbus;

import org.immutables.value.Value;
import org.immutables.value.Value.Style.ImplementationVisibility;

@Value.Style(visibility = ImplementationVisibility.PACKAGE)
@Value.Immutable(copy = false, builder = false)
public interface SubscribeEvent {

	@Value.Parameter
	String clientId();

	public static SubscribeEvent of(String clientId) {
		return ImmutableSubscribeEvent.of(clientId);
	}

}
