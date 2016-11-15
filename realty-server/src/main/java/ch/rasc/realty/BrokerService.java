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
@RequestMapping("/broker")
public class BrokerService {

	private Map<Integer, Broker> brokerDb;

	public BrokerService() throws IOException {
		ClassPathResource cpr = new ClassPathResource("/brokers.txt");
		try (InputStream is = cpr.getInputStream()) {
			String json = StreamUtils.copyToString(is, StandardCharsets.UTF_8);
			
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
			mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
			List<Broker> brokers = mapper.readValue(json,
					new TypeReference<List<Broker>>() {
						// nothing here
					});
			this.brokerDb = brokers.stream()
					.collect(Collectors.toMap(Broker::id, Function.identity()));
		}
	}

	@GetMapping("/findAll")
	@CrossOrigin
	public List<Broker> findAll() {
		return this.brokerDb.values().stream().sorted(Comparator.comparing(Broker::id))
				.collect(Collectors.toList());
	}

	@GetMapping("/findById/{id}")
	@CrossOrigin
	public Broker findById(@PathVariable("id") int id) {
		return this.brokerDb.get(id);
	}

}
