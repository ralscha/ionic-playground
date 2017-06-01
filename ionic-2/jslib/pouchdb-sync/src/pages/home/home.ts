import {Component} from '@angular/core';
import {Todos} from "../../providers/todos";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: any;

  constructor(private todoService: Todos, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });
  }

  createTodo() {
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [{
        name: 'title'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Save',
        handler: data => {
          this.todoService.createTodo({title: data.title});
        }
      }]
    });

    prompt.present();

  }

  updateTodo(todo) {

    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [{
        name: 'title'
      }
      ],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Save',
        handler: data => {
          this.todoService.updateTodo({
            _id: todo._id,
            _rev: todo._rev,
            title: data.title
          });
        }
      }]
    });

    prompt.present();
  }

  deleteTodo(todo) {
    this.todoService.deleteTodo(todo);
  }

}
