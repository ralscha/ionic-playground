import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/notes/notes.html',
})
export class NotesPage {

  notes: any = [];

  constructor(private nav: NavController) {
  }

  addNote() {
    let prompt = Alert.create({
      title: 'Add Note',
      inputs: [{
        name: 'title'
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.notes.push(data);
          }
        }
      ]
    });

    this.nav.present(prompt);
  }

  editNote(note) {
    let prompt = Alert.create({
      title: 'Edit Note',
      inputs: [{
        name: 'title',
        value: note.title
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let index = this.notes.indexOf(note);

            if (index > -1) {
              this.notes[index] = data;
            }
          }
        }
      ]
    });

    this.nav.present(prompt);

  }

  deleteNote(note) {
    let index = this.notes.indexOf(note);
    if (index > -1) {
      this.notes.splice(index, 1);
    }
  }

}
