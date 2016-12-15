package ch.rasc.rss;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;

@SpringBootApplication
@RestController
public class RssApplication {

	public static void main(String[] args) {
		SpringApplication.run(RssApplication.class, args);
	}

	@CrossOrigin
	@GetMapping("/rss2Json")
	public List<FeedItem> rssToJson(@RequestParam("feedUrl") String feedUrl) {
		SyndFeed info = fetchFeed(feedUrl);

		List<FeedItem> items = new ArrayList<>();
		int id = 0;
		if (info != null) {
			for (SyndEntry entry : info.getEntries()) {
				if (entry != null) {
					FeedItem item = new FeedItem(id++, entry);
					items.add(item);
				}
			}
		}
		return items;
	}

	private static SyndFeed fetchFeed(String url) {
		try (CloseableHttpClient client = HttpClients.createMinimal()) {
			HttpUriRequest method = new HttpGet(url);
			try (CloseableHttpResponse response = client.execute(method);
					InputStream stream = response.getEntity().getContent()) {
				SyndFeedInput input = new SyndFeedInput();
				try (XmlReader reader = new XmlReader(stream)) {
					return input.build(reader);
				}
			}
		}

		catch (IllegalArgumentException | IOException | FeedException e) {
			LoggerFactory.getLogger(RssApplication.class).error("fetch rss feed", e);
			return null;
		}
	}
}
