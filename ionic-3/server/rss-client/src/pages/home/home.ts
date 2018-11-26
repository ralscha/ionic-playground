import {Component, ViewChild} from '@angular/core';
import {NavController, AlertController, Nav, IonicPage} from 'ionic-angular';
import {FeedProvider, Feed} from '../../providers/feed/feed';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage = 'FeedListPage';
  feeds: Feed[];

  constructor(private readonly navController: NavController,
              private readonly feedProvider: FeedProvider,
              private readonly alertCtrl: AlertController) {
  }

  public addFeed() {
    const prompt = this.alertCtrl.create({
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
            this.feedProvider.addFeed(newFeed).then(
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
    this.feedProvider.getSavedFeeds().then(
      allFeeds => {
        this.feeds = allFeeds;
      });
  }

  public openFeed(feed: Feed) {
    this.nav.setRoot('FeedListPage', {'selectedFeed': feed});
  }

  public ionViewWillEnter() {
    this.loadFeeds();
  }
}
