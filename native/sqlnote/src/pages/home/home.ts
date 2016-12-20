import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NoteService, Note} from "../../providers/note-service";
import {NoteDetailPage} from "../note-detail/note-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes: Note[];

  constructor(public nav: NavController, public noteService: NoteService) {
    this.loadNotes();
  }

  // Initialise the notes by loading data from our DB
  private loadNotes() {
    this.notes = [];
    this.noteService.getNotes().then(
      data => {
        this.notes = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            const item = data.rows.item(i);
            this.notes.push(new Note(item.title, item.text, item.id));
          }
        }
      }).catch(err=>console.error(err));
  }

  // Push the details page bute without an existing note
  public addNote() {
    this.nav.push(NoteDetailPage);
  }

  // Push the details page for our selected Note
  public noteSelected(item: Note) {
    this.nav.push(NoteDetailPage, {'note': item});
  }

  // Remove the note from the DB and our current arra
  public removeNote(note: Note) {
    this.noteService.removeNote(note);
    let index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
    }
  }

  // Load our todos once the page appears
  onViewDidEnter() {
    this.loadNotes();
  }
}
