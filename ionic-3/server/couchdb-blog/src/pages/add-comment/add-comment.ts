import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CommentsProvider} from "../../providers/comments/comments";

@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html'
})
export class AddCommentPage {

  comment: any = {
    author: 'Josh Morony',
    content: '',
    datePublished: '',
    type: 'comment',
    post: null
  };

  constructor(private readonly navCtrl: NavController,
              private readonly navParams: NavParams,
              private readonly commentsProvider: CommentsProvider) {
  }

  ionViewDidLoad() {
    this.comment.post = this.navParams.get('post')._id;
  }

  save() {
    // Generate computed fields
    this.comment.datePublished = new Date().toISOString();
    this.commentsProvider.addComment(this.comment);
    this.navCtrl.pop();
  }

}
