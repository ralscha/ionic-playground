import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

export class FeedItem {
  constructor(public description: string, public link: string, public title: string) {
  }
}

export class Feed {
  constructor(public title: string, public url: string) {
  }
}

@Injectable()
export class FeedService {
  constructor(private readonly http: Http, private readonly storage: Storage) {
  }

  public getSavedFeeds() {
    return this.storage.get('savedFeeds').then(data => {
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      }
      else {
        return [];
      }
    });
  }

  public addFeed(newFeed: Feed) {
    return this.getSavedFeeds().then(data => {
      data.push(newFeed);
      return this.storage.set('savedFeeds', JSON.stringify(data));
    });
  }

  public getArticlesForUrl(feedUrl: string) {
    const url = `http://bb5c4ebb.ngrok.io/rss2Json?feedUrl=${feedUrl}`;

    let articles = [];
    return this.http.get(url)
      .map(data => data.json())
      .map(res => {
        if (res == null) {
          return articles;
        }

        for (let i = 0; i < res.length; i++) {
          let item = res[i];
          var trimmedDescription = item.description.length > 80 ?
            item.description.substring(0, 80) + "..." : item.description;
          let newFeedItem = new FeedItem(trimmedDescription, item.link, item.title);
          articles.push(newFeedItem);
        }
        return articles
      });
  }

}
