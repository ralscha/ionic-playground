import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Data {

  todos: any = [];

  constructor(private storage: Storage) {
  }

  load() {
    return new Promise(resolve => {
      if (this.todos.length > 0) {
        resolve(this.todos);
      } else {
        this.storage.get('todoData').then((todos) => {
          if (todos && typeof (todos) != "undefined") {
            this.todos = todos;
          }
          resolve(this.todos)
        });
      }
    });
  }

  save(todo) {
    let index = this.todos.indexOf(todo);

    if (index === -1) {
      this.todos.push(todo);
    } else {
      this.todos[index] = todo;
    }

    this.storage.set('todoData', this.todos);
  }

}
