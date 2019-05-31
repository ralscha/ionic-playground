import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {NotesService} from '../services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor(public readonly notesService: NotesService,
              private readonly alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.notesService.load();
  }

  addNote() {

    this.alertCtrl.create({
      header: 'New Note',
      message: 'What should the title of this note be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.notesService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });

  }

}
