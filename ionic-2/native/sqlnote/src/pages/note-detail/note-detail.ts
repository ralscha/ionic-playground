import {Component} from '@angular/core';
import {NavParams, ToastController} from 'ionic-angular';
import {Note, NoteService} from "../../providers/note-service";

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html'
})
export class NoteDetailPage {
  note: Note = null;

  constructor(navParams: NavParams, public noteService: NoteService, private toastCtrl: ToastController) {
    let passedNote = navParams.get('note');
    // Try to initialise our note for the page
    if (passedNote !== undefined) {
      this.note = passedNote;
    } else {
      this.note = new Note('', '', null);
      this.saveNote();
    }
  }

  // Save our note to the DB and show a message (optional)
  public saveNote(showBadge: boolean = false) {
    if (this.note.id === null) {
      this.noteService.saveNote(this.note).then((data) => {
        // Set the automatic created id to our note
        this.note.id = data.insertId;
      });
    } else {
      this.noteService.updateNote(this.note);
    }
    if (showBadge) {
      let toast = this.toastCtrl.create({
        message: 'Note saved',
        duration: 3000
      });
      toast.present();
    }
  }

  ionViewDidLeave() {
    this.saveNote(true);
  }
}
