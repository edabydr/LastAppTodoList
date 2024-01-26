import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})



export class HomeComponent {
  
  data = {
    pendings: [
      'ödev'
    ],
    inProgress: [
      'Todo List'
    ],
    done: [
      'Test'
    ]
  };

  ngOnInit() {

    this.setItems();

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,);
      Object.keys(this.data).forEach((key: any) => {
        localStorage.setItem(key, JSON.stringify(this.data.pendings[key]));
      });
    }
  }

  addTodo(todo: any) {

    this.data.pendings.push(todo.value);
    todo.value = '';
    localStorage.setItem('pendings', JSON.stringify(this.data.pendings));
  }

  setItems() {

    Object.keys(this.data).forEach((key: any) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(this.data.pendings[key]));
      }
      else {
        this.data = JSON.parse(this.data.pendings[key]);
      }

    });
  }
}
