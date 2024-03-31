import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { KanbanBoardInterface } from '../types/kanban.interface';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor() { }

  getBoards(): Observable<KanbanBoardInterface> {
    const kanbanBoard: KanbanBoardInterface = JSON.parse(String(localStorage.getItem('kanbanDB')));
    console.log('service', kanbanBoard);
    
    return of(kanbanBoard).pipe(delay(2000));
  }
}
