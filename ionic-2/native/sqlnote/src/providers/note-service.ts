import {SQLite} from 'ionic-native';
import {Platform} from "ionic-angular";
import {Injectable} from "@angular/core";

export class Note {
  constructor(public title: string, public text: string, public id: number) {
  }
}
@Injectable()
export class NoteService {
  storage: Storage = null;
  db: SQLite;

  // Init an empty DB if it does not exist by now!
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.db = new SQLite();
      this.db.openDatabase({
        name: 'noteapp.db',
        location: 'default'
      }).then(() => this.db.executeSql('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT)', []))
        .catch(err => console.error('error: ', err));
    });
  }

  // Get all notes of our DB
  public getNotes() {
    return this.platform.ready().then(() => {
      return this.db.openDatabase({
        name: 'noteapp.db',
        location: 'default'
      });
    }).then(() => this.db.executeSql('SELECT * FROM notes', []));
  }

  // Save a new note to the DB
  public saveNote(note: Note) {
    return this.db.openDatabase({
      name: 'noteapp.db',
      location: 'default'
    }).then(() => this.db.executeSql('INSERT INTO notes (title, text) VALUES (?,?)', [note.title, note.text]));
  }

  // Update an existing note with a given ID
  public updateNote(note: Note) {
    return this.db.openDatabase({
      name: 'noteapp.db',
      location: 'default'
    }).then(() => this.db.executeSql('UPDATE notes SET title = ?, text = ? WHERE id = ?', [note.title, note.text, note.id]));
  }

  // Remoe a not with a given ID
  public removeNote(note: Note) {
    return this.db.openDatabase({
      name: 'noteapp.db',
      location: 'default'
    }).then(() => this.db.executeSql('DELETE FROM notes WHERE id = ?', [note.id]));
  }
}
