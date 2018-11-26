import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PostsProvider} from "../../providers/posts/posts";
import {AddPostPage} from "../add-post/add-post";
import {ViewPostPage} from "../view-post/view-post";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: any;

  constructor(private readonly navCtrl: NavController,
              private readonly postsProvider: PostsProvider) {
  }

  ionViewDidLoad() {
    this.postsProvider.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  viewPost(post) {
    this.navCtrl.push(ViewPostPage, {
      post: post
    });
  }

  pushAddPostPage() {
    this.navCtrl.push(AddPostPage);
  }

}
