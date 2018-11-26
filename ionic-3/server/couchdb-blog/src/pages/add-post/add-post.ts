import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PostsProvider} from "../../providers/posts/posts";

@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html'
})
export class AddPostPage {

  post: any = {
    _id: null,
    author: 'Josh Morony',
    content: '',
    datePublished: '',
    dateUpdated: '',
    title: '',
    type: 'post'
  };

  constructor(private readonly  navCtrl: NavController,
              private readonly postProvider: PostsProvider) {
  }

  save() {
    this.post._id = this.post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    this.post.datePublished = new Date().toISOString();
    this.post.dateUpdated = new Date().toISOString();
    this.postProvider.addPost(this.post);
    this.navCtrl.pop();
  }

}
