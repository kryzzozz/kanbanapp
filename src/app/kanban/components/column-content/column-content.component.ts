import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnInterface, KanbanBoardInterface, TaskInterface } from '../../types/kanban.interface';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { kanbanSelector, selectedBoardId } from '../../store/selectors';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { updateLocalStorage, updateTaskStatus } from '../../store/actions';

@Component({
  selector: 'app-column-content',
  templateUrl: './column-content.component.html',
  styleUrls: ['./column-content.component.scss']
})
export class ColumnContentComponent implements OnInit {
  @Input() columnContent?: ColumnInterface;
  @Output() cardId = new EventEmitter<number>();

  kanbanBoards$: Observable<KanbanBoardInterface>;
  selectedBoardId$: Observable<number>;
  kanbanSubcription: Subscription = new Subscription();
  columns: ColumnInterface[] = [];
  filteredColumns: ColumnInterface[] = [];
  columTitles: string[] = [];
  tasks: TaskInterface[] = [];
  varTodoList = 'todoList';

  constructor(
    private store: Store<AppStateInterface>,
  ) {
    this.selectedBoardId$ = this.store.pipe(select(selectedBoardId));
    this.kanbanBoards$ = this.store.pipe(select(kanbanSelector));
  }

  ngOnInit(): void {

    // if(this.selectedBoardId$) {
    //   this.selectedBoardId$.subscribe((selectedBoardId) => {
    //     if(this.kanbanBoards$)
    //       this.kanbanSubcription = this.kanbanBoards$.subscribe((kanbanBoards) => {
    //         if(kanbanBoards.boards[selectedBoardId] && kanbanBoards.boards[selectedBoardId].columns.length > 0) {
    //           this.tasks = kanbanBoards.boards[selectedBoardId].tasks.filter((task) => task.status === this.columnContent?.id);
    //         }
    //       });

    //   })
    // };

    if(this.kanbanBoards$)
      this.kanbanSubcription = this.kanbanBoards$.subscribe((kanbanBoards) => {
        if(kanbanBoards.boards[0] && kanbanBoards.boards[0].columns.length > 0) {
          this.tasks = kanbanBoards.boards[0].tasks.filter((task) => task.status === this.columnContent?.id);
          
          this.columns = kanbanBoards.boards[0].columns;
          this.filteredColumns = this.filterColumns(this.columns, this.columnContent?.id as number);
          this.columTitles = this.getArrayColumnTitles(this.filteredColumns);
        }
      });
  }

  sendCardId(cardId: number) {
    this.cardId.emit(cardId);
  }

  getArrayColumnTitles(columnsArray: ColumnInterface[]): string[] {
    return columnsArray.map(column => column.title);
  }

  filterColumns(columnsArray: ColumnInterface[], columnId: number) {
    return columnsArray.filter(column => column.id !== columnId);
  }
  
  drop(event: CdkDragDrop<TaskInterface[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      this.store.dispatch(updateTaskStatus({ taskId: event.previousContainer.data[event.previousIndex].id, statusId: event.container.data[0].status }));
      this.store.dispatch(updateLocalStorage());
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
