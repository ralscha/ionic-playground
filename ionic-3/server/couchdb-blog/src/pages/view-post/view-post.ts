import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CommentsProvider} from "../../providers/comments/comments";
import {AddCommentPage} from "../add-comment/add-comment";

@Component({
  selector: 'page-view-post',
  templateUrl: 'view-post.html',
})
export class ViewPostPage {

  post: any;
  comments: any;

  constructor(private readonly navParams: NavParams,
              private readonly navCtrl: NavController,
              private readonly commentsProvider:CommentsProvider) {
  }

  ionViewDidLoad() {
    this.post = this.navParams.get('post');

    this.commentsProvider.getComments(this.post._id).subscribe((comments) => {
      this.comments = comments;
    });
  }

  pushAddCommentPage(){

    this.navCtrl.push(AddCommentPage, {
      post: this.post
    });

  }
}
