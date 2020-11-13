import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from '../services/notes.service';
import {Note} from '../interfaces/note';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  note: Note;

  constructor(private route: ActivatedRoute, private notesService: NotesService, private navCtrl: NavController) {

    // Initialise a placeholder note until the actual note can be loaded in
    this.note = {
      id: '',
      title: '',
      content: ''
    };

  }

  ngOnInit(): void {

    // Get the id of the note from the URL
    const noteId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if (this.notesService.loaded && noteId) {
      const n = this.notesService.getNote(noteId);
      if (n) {
        this.note = n;
      }
    } else if (noteId) {
      this.notesService.load().then(() => {
        const n = this.notesService.getNote(noteId);
        if (n) {
          this.note = n;
        }
      });
    }

  }

  noteChanged(): void {
    this.notesService.save();
  }

  deleteNote(): void {
    if (this.note) {
      this.notesService.deleteNote(this.note);
      this.navCtrl.navigateBack('/notes');
    }
  }

}
