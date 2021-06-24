import { Injectable } from '@angular/core';
import { ToDoItem } from './to-do-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ToDoItemsService {
  public ToDoItemUrl = 'http://34.68.208.129/rest_api/v1/ToDoItem/';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getToDoItems(): Observable<ToDoItem[]> {
  return this.http.get<ToDoItem[]>(this.ToDoItemUrl).pipe(
      catchError(this.handleError<ToDoItem[]>('getToDoItem', []))
    );
}
  addToDoItems(todoitem: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.ToDoItemUrl, todoitem, this.httpOptions).pipe(
      catchError(this.handleError<ToDoItem>('addToDoItems'))
    );
  }

  constructor(
    private http: HttpClient,
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
