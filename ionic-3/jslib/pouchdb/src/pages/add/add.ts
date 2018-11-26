import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ImageProvider} from "../../providers/image/image";
import {DatabaseProvider} from "../../providers/database/database";

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  public form: FormGroup;
  public comicCharacter: any;
  public comicTitle: any;
  public comicRating: any;
  public comicNote: any;
  public comicImage: any;
  public characterImage: any;
  public recordId: any;
  public revisionId: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;


  constructor(public navCtrl: NavController,
              public NP: NavParams,
              public fb: FormBuilder,
              public IMAGE: ImageProvider,
              public DB: DatabaseProvider,
              public toastCtrl: ToastController) {
    this.form = fb.group({
      "character": ["", Validators.required],
      "title": ["", Validators.required],
      "rating": ["", Validators.required],
      "image": ["", Validators.required],
      "note": ["", Validators.required]
    });

    this.resetFields();

    if (NP.get("key") && NP.get("rev")) {
      this.recordId = NP.get("key");
      this.revisionId = NP.get("rev");
      this.isEdited = true;
      this.selectComic(this.recordId);
      this.pageTitle = 'Amend entry';
    }
    else {
      this.recordId = '';
      this.revisionId = '';
      this.isEdited = false;
      this.pageTitle = 'Create entry';
    }
  }

  selectComic(id) {
    this.DB.retrieveComic(id)
      .then((doc) => {
        this.comicCharacter = doc[0].character;
        this.comicTitle = doc[0].title;
        this.comicRating = doc[0].rating;
        this.comicNote = doc[0].note;
        this.comicImage = doc[0].image;
        this.characterImage = doc[0].image;
        this.recordId = doc[0].id;
        this.revisionId = doc[0].rev;
      });
  }


  saveComic() {
    let character: string = this.form.controls["character"].value,
      title: string = this.form.controls["title"].value,
      rating: number = this.form.controls["rating"].value,
      image: string = this.form.controls["image"].value,
      note: string = this.form.controls["note"].value,
      revision: string = this.revisionId,
      id: any = this.recordId;

    if (this.recordId !== '') {
      this.DB.updateComic(id, title, character, rating, note, image, revision)
        .then((data) => {
          this.hideForm = true;
          this.sendNotification(`${character} was updated in your comic characters list`);
        });
    }
    else {
      this.DB.addComic(title, character, rating, note, image)
        .then((data) => {
          this.hideForm = true;
          this.resetFields();
          this.sendNotification(`${character} was added to your comic characters list`);
        });
    }
  }


  takePhotograph() {
    this.IMAGE.takePhotograph()
      .then((image) => {
        this.characterImage = image.toString();
        this.comicImage = image.toString();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  selectImage() {
    this.IMAGE.selectPhotograph()
      .then((image) => {
        this.characterImage = image.toString();
        this.comicImage = image.toString();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  deleteComic() {
    let character;

    this.DB.retrieveComic(this.recordId)
      .then((doc) => {
        character = doc[0].character;
        return this.DB.removeComic(this.recordId, this.revisionId);
      })
      .then((data) => {
        this.hideForm = true;
        this.sendNotification(`${character} was successfully removed from your comic characters list`);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  resetFields(): void {
    this.comicTitle = "";
    this.comicRating = "";
    this.comicCharacter = "";
    this.comicNote = "";
    this.comicImage = "";
    this.characterImage = "";
  }


  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

}
