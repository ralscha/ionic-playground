import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {HttpClient} from "@angular/common/http";

export class FeedItem {
  constructor(public description: string, public link: string, public title: string) {
  }
}

export class Feed {
  constructor(public title: string, public url: string) {
  }
}

@Injectable()
export class FeedProvider {

  constructor(private readonly httpClient: HttpClient,
              private readonly storage: Storage) {
  }

  public getSavedFeeds() {
    return this.storage.get('savedFeeds').then(data => {
      const objFromString = JSON.parse(data);
      if (data !== null && data !== undefined) {
        return objFromString;
      } else {
        return [];
      }
    });
  }

  public addFeed(newFeed: Feed) {
    return this.getSavedFeeds().then(arrayOfFeeds => {
      arrayOfFeeds.push(newFeed);
      let jsonString = JSON.stringify(arrayOfFeeds);
      return this.storage.set('savedFeeds', jsonString);
    });
  }

  public getArticlesForUrl(feedUrl: string) {
    const url = `http://localhost:8080/rss2Json?feedUrl=${feedUrl}`;

    const articles = [];
    return this.httpClient.get<any>(url)
      .map(res => {
        if (res == null) {
          return articles;
        }

        for (let i = 0; i < res.length; i++) {
          const item = res[i];
          const trimmedDescription = item.description.length > 80 ?
            item.description.substring(0, 80) + "..." : item.description;
          const newFeedItem = new FeedItem(trimmedDescription, item.link, item.title);
          articles.push(newFeedItem);
        }
        return articles
      });
  }

}
