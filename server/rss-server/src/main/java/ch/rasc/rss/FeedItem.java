package ch.rasc.rss;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import com.rometools.rome.feed.synd.SyndEntry;

public class FeedItem {

	private final int id;

	private final String title;

	private final String author;

	private final String link;

	private final LocalDateTime pubDate;

	private final String description;

	private final String content;

	public FeedItem(int id, SyndEntry entry) {
		this.id = id;
		this.title = entry.getTitle();
		this.author = entry.getAuthor();
		this.link = entry.getLink();

		if (entry.getPublishedDate() != null) {
			this.pubDate = LocalDateTime.ofInstant(entry.getPublishedDate().toInstant(),
					ZoneOffset.UTC);
		}
		else {
			this.pubDate = null;
		}

		if (entry.getDescription() != null) {
			this.description = entry.getDescription().getValue();
		}
		else {
			this.description = null;
		}

		if (!entry.getContents().isEmpty()) {
			this.content = entry.getContents().iterator().next().getValue();
		}
		else if (entry.getDescription() != null) {
			this.content = entry.getDescription().getValue();
		}
		else {
			this.content = null;
		}
	}

	public int getId() {
		return this.id;
	}

	public String getTitle() {
		return this.title;
	}

	public String getAuthor() {
		return this.author;
	}

	public String getLink() {
		return this.link;
	}

	public LocalDateTime getPubDate() {
		return this.pubDate;
	}

	public String getDescription() {
		return this.description;
	}

	public String getContent() {
		return this.content;
	}

}
