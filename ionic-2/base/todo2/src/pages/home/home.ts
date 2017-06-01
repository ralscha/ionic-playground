import { Data } from './../../providers/data';
import { EditTodoPage } from './../edit-todo/edit-todo';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: any;

  constructor(private navCtrl: NavController, public data: Data) {
  }

  ionViewDidLoad() {
    this.data.load();
  }

  addTodo() {
    this.navCtrl.push(EditTodoPage);
  }

  editTodo(todo) {
    this.navCtrl.push(EditTodoPage, {
      todo: todo
    });
  }

}
