import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { BoardInterface, KanbanBoardInterface, TaskInterface } from '../types/kanban.interface';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { kanbanSelector } from '../store/selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  kanbanBoards$: Observable<KanbanBoardInterface>;

  constructor(private store: Store<AppStateInterface>) { 
    this.kanbanBoards$ = this.store.pipe(untilDestroyed(this), select(kanbanSelector));
  }

  getBoards(): Observable<KanbanBoardInterface> {
    const kanbanBoard: KanbanBoardInterface = JSON.parse(String(localStorage.getItem('kanbanDB')));
    return of(kanbanBoard).pipe(delay(2000));
  }

  saveTask(payload: TaskInterface): Observable<BoardInterface[]> {
    let updatedBoards: BoardInterface[] = [];
    const newTask: TaskInterface = payload;

    this.kanbanBoards$.subscribe(
      (kanbanBoards => {
        if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
          updatedBoards = kanbanBoards.boards.map(board => ({ ...board }));
          const boardIndex = updatedBoards.findIndex(board => board.id === 1);

          if (boardIndex !== -1) {
            const updatedBoard = { ...updatedBoards[boardIndex] };
            updatedBoard.tasks = [...updatedBoard.tasks, newTask];
            updatedBoards[boardIndex] = updatedBoard;
          }
        }
      })
    );
    return of(updatedBoards);
  }

  getMaxTaskId(columnId: number): Observable<number> {
    return this.kanbanBoards$.pipe(
      map(kanbanBoards => {
        let maxId = 0;
        if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
          const tasks = kanbanBoards.boards[0].tasks;
          if (tasks.length > 0) {
            maxId = Math.max(...tasks.map(task => task.id));
          }
        }
        return maxId;
      })
    );
  }

  getMaxTaskOrder(columnId: number): Observable<number> {
    return this.kanbanBoards$.pipe(
      map(kanbanBoards => {
        let maxOrder = 0;
        if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
          const column = kanbanBoards.boards.flatMap(board => board.columns).find(column => column.id === columnId);
          if (column) {
            const tasks = kanbanBoards.boards.flatMap(board => board.tasks).filter(task => task.status === columnId);
            if (tasks.length > 0) {
              maxOrder = Math.max(...tasks.map(task => task.order));
            }
          }
        }
        return maxOrder;
      })
    );
  }
}