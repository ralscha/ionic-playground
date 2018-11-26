import {Injectable, NgZone} from '@angular/core';
import 'rxjs/add/observable/from';
import {Subject} from "rxjs/Subject";
import {DataProvider} from "../data/data";

@Injectable()
export class PostsProvider {

  private posts: any;
  private postSubject: any = new Subject();

  constructor(private readonly dataProvider: DataProvider, private readonly zone: NgZone) {
    this.dataProvider.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
      if (change.doc.type === 'post') {
        this.changePost(change);
      }
    });
  }

  getPosts() {
    this.emitPosts();
    return this.postSubject;
  }

  addPost(post): void {
    this.dataProvider.db.put(post);
  }

  emitPosts(): void {
    this.zone.run(() => {
      this.dataProvider.db.query('posts/by_date_published').then((data) => {
        this.posts = data.rows.map(row => row.value);
        this.postSubject.next(this.posts);
      });
    });
  }

  changePost(change): void {
    let changedDoc = null;
    let changedIndex = null;

    // Find the affected document (if any)
    this.posts.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

    //A document was deleted - remove it
    if (change.deleted) {
      this.posts.splice(changedIndex, 1);
    } else {
      //A document was updated - change it
      if (changedDoc) {
        this.posts[changedIndex] = change.doc;
      }
      //A document was added - add it
      else {
        this.posts.push(change.doc);
      }
    }
    this.postSubject.next(this.posts);
  }

}
