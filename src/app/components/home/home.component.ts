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
    if(!localStorage.getItem('pendings')){
      localStorage.setItem('pendings', JSON.stringify(this.data.pendings));
    }else{
      this.data.pendings = JSON.parse('pendings');
    }
    if(!localStorage.getItem('inProgress')){
      localStorage.setItem('inProgress', JSON.stringify(this.data.inProgress));
    }else{
      this.data.pendings = JSON.parse('inProgress');
    }
    if(!localStorage.getItem('done')){
      localStorage.setItem('done', JSON.stringify(this.data.done));
    }else{
      this.data.pendings = JSON.parse('done');
    }


  }
}
