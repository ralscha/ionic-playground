import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";
import * as PouchDB from 'pouchdb';

@Injectable()
export class Database {

  private db;

  constructor(public http: Http,
              public alertCtrl: AlertController) {
    this.initialiseDB();
  }

  initialiseDB() {
    this.db = new PouchDB('comics');
  }

  addComic(title, character, rating, note, image) {
    const timeStamp = new Date().toISOString();
    const base64String = image.substring(23);
    const comic = {
      _id: timeStamp,
      title: title,
      character: character,
      rating: rating,
      note: note,
      _attachments: {
        "character.jpg": {
          content_type: 'image/jpeg',
          data: base64String
        }
      }
    };

    return new Promise(resolve => {
      this.db.put(comic)
        .then(() => resolve(true))
        .catch((err) => {
          this.errorHandler(err);
          resolve(false);
        });
    });
  }

  updateComic(id, title, character, rating, note, image, revision) {
    const base64String = image.substring(23);
    const comic = {
      _id: id,
      _rev: revision,
      title: title,
      character: character,
      rating: rating,
      note: note,
      _attachments: {
        "character.jpg": {
          content_type: 'image/jpeg',
          data: base64String
        }
      }
    };

    return new Promise(resolve => {
      this.db.put(comic)
        .then(() => resolve(true))
        .catch((err) => {
          this.errorHandler(err);
          resolve(false);
        });
    });
  }


  retrieveComic(id) {
    return new Promise(resolve => {
      this.db.get(id, {attachments: true})
        .then((doc) => {
          var item = [],
            dataURIPrefix = 'data:image/jpeg;base64,',
            attachment;

          if (doc._attachments) {
            attachment = doc._attachments["character.jpg"].data;
          }

          item.push({
            id: id,
            rev: doc._rev,
            character: doc.character,
            title: doc.title,
            note: doc.note,
            rating: doc.rating,
            image: dataURIPrefix + attachment
          });
          resolve(item);
        })
    });
  }

  retrieveComics() {
    return new Promise(resolve => {
      this.db.allDocs({include_docs: true, descending: true, attachments: true}, function (err, doc) {
        let items = [],
          row = doc.rows;

        for (let k in row) {
          const item = row[k].doc;
          const dataURIPrefix = 'data:image/jpeg;base64,';
          let attachment;

          if (item._attachments) {
            attachment = dataURIPrefix + item._attachments["character.jpg"].data;
          }

          items.push({
            id: item._id,
            rev: item._rev,
            character: item.character,
            title: item.title,
            note: item.note,
            rating: item.rating,
            image: attachment
          });
        }
        resolve(items);
      });
    });
  }


  removeComic(id, rev) {
    return new Promise(resolve => {
      const comic = {_id: id, _rev: rev};
      this.db.remove(comic)
        .then(() => resolve(true))
        .catch((err) => {
          this.errorHandler(err);
          resolve(false);
        });
    });
  }


  errorHandler(err) {
    const headsUp = this.alertCtrl.create({
      title: 'Heads Up!',
      subTitle: err,
      buttons: ['Got It!']
    });

    headsUp.present();
  }


}
