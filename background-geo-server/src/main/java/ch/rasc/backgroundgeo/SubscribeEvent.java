package ch.rasc.backgroundgeo;

import org.immutables.value.Value;
import org.immutables.value.Value.Style.ImplementationVisibility;


@Value.Style(visibility = ImplementationVisibility.PACKAGE)
@Value.Immutable(copy = false, builder = false)
public interface SubscribeEvent {

	@Value.Parameter
	String clientId();

	@Value.Parameter
	String name();

	public static SubscribeEvent of(String clientId, String name) {
		return ImmutableSubscribeEvent.of(clientId, name);
	}

}
