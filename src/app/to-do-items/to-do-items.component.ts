import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../to-do-item';
import { ToDoItemsService } from '../to-do-items.service';


@Component({
  selector: 'app-to-do-items',
  templateUrl: './to-do-items.component.html',
  styleUrls: ['./to-do-items.component.css']
})
export class ToDoItemsComponent implements OnInit {
  selectedToDoItem?: ToDoItem;

  todoitems: ToDoItem[] = [];



  constructor(private ToDoItemsService: ToDoItemsService) {}

  ngOnInit(): void {
    this.getToDoItems();
  }

  add(text: string): void {
    var data = {"text":text,"done":false}
    this.ToDoItemsService.addToDoItems(data  as ToDoItem)
      .subscribe(todoitem => {
        this.todoitems.push(todoitem);
      });
  }

  getToDoItems(): void {
  this.ToDoItemsService.getToDoItems()
    .subscribe(todoitems => this.todoitems = todoitems);
}
}
