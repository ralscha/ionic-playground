import {Component, ViewChild} from '@angular/core';
import {Nav, AlertController, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {FeedListPage} from "../pages/feed-list/feed-list";
import {Feed, FeedService} from "../providers/feed-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = FeedListPage;
  feeds: Feed[];

  constructor(private feedService: FeedService, public alertCtrl: AlertController, private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.loadFeeds();
    });
  }

  public addFeed() {
    let prompt = this.alertCtrl.create({
      title: 'Add Feed URL',
      inputs: [
        {
          name: 'name',
          placeholder: 'The best Feed ever'
        },
        {
          name: 'url',
          placeholder: 'http://www.myfeedurl.com/feed'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let newFeed = new Feed(data.name, data.url);
            this.feedService.addFeed(newFeed).then(
              res => {
                this.loadFeeds();
              }
            );
          }
        }
      ]
    });
    prompt.present();
  }

  private loadFeeds() {
    this.feedService.getSavedFeeds().then(
      allFeeds => {
        this.feeds = allFeeds;
      });
  }

  public openFeed(feed: Feed) {
    this.nav.setRoot(FeedListPage, {'selectedFeed': feed});
  }

}

