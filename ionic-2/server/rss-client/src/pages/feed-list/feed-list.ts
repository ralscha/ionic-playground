import { Component } from '@angular/core';
import {FeedService, FeedItem, Feed} from "../../providers/feed-service";
import {InAppBrowser} from "ionic-native";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html'
})
export class FeedListPage {
  articles: FeedItem[];
  selectedFeed: Feed;
  loading: boolean;

  constructor(private feedService: FeedService, private navParams: NavParams) {
    this.selectedFeed = navParams.get('selectedFeed');
  }

  public openArticle(url: string) {
    let browser = new InAppBrowser(url, '_system');
  }

  loadArticles() {
    this.loading = true;
    this.feedService.getArticlesForUrl(this.selectedFeed.url).subscribe(res => {
      this.articles = res;
      this.loading = false;
    });
  }

  public ionViewWillEnter() {
    if (this.selectedFeed !== undefined && this.selectedFeed !== null ) {
      this.loadArticles()
    } else {
      this.feedService.getSavedFeeds().then(
        feeds => {
          if (feeds.length > 0) {
            let item = feeds[0];
            this.selectedFeed = new Feed(item.title, item.url);
            this.loadArticles();
          }
        }
      );
    }
  }
}
