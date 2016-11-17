package ch.rasc.realty;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/property")
public class PropertyService {

	private Map<Integer, Property> propertyDb;

	public PropertyService() throws IOException {
		ClassPathResource cpr = new ClassPathResource("/properties.txt");
		try (InputStream is = cpr.getInputStream()) {
			String json = StreamUtils.copyToString(is, StandardCharsets.UTF_8);

			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
			mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
			List<Property> properties = mapper.readValue(json,
					new TypeReference<List<Property>>() {
						// nothing here
					});
			this.propertyDb = properties.stream()
					.collect(Collectors.toMap(Property::id, Function.identity()));
		}
	}

	@GetMapping("/findAll")
	@CrossOrigin
	public List<Property> findAll() {
		return this.propertyDb.values().stream()
				.sorted(Comparator.comparing(Property::id)).collect(Collectors.toList());
	}

	@GetMapping("/findById/{id}")
	@CrossOrigin
	public Property findById(@PathVariable("id") int id) {
		return this.propertyDb.get(id);
	}

	@GetMapping("/findByName/{name}")
	@CrossOrigin
	public List<Property> findById(@PathVariable("name") String name) {
		String filter = name.toLowerCase();
		return this.propertyDb.values().stream().filter(p -> {
			String str = String.join(" ", p.title(), p.address(), p.city(),
					p.description());
			return str.toLowerCase().indexOf(filter) >= 0;
		}).collect(Collectors.toList());
	}

	@GetMapping("/like/{id}")
	@CrossOrigin
	public int like(@PathVariable("id") int id) {
		Property property = this.propertyDb.get(id);
		int noOfLikes = property.likes() + 1;
		this.propertyDb.put(id, ImmutableProperty.copyOf(property).withLikes(noOfLikes));
		return noOfLikes;
	}

}
