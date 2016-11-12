import { Data } from './../../providers/data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-todo',
  templateUrl: 'edit-todo.html'
})
export class EditTodoPage {
  todo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: Data) {
    this.todo = {
      title: '',
      description: ''
    };
  }

  ionViewDidLoad() {
    let todo = this.navParams.get('todo');
    if (todo) {
      this.todo = todo;
    }
  }

  save() {
    this.data.save(this.todo);
    this.navCtrl.pop();
  }
}
