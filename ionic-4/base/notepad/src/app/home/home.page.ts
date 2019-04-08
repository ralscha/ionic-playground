import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {NotesService} from '../services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private readonly notesService: NotesService,
              private readonly alertCtrl: AlertController,
              private readonly navCtrl: NavController){

  }

  ngOnInit(){
    this.notesService.load();
  }

  addNote(){

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
