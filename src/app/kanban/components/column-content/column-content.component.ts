import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnInterface, KanbanBoardInterface, TaskInterface } from '../../types/kanban.interface';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { kanbanSelector, selectedBoardId } from '../../store/selectors';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
  tasks: TaskInterface[] = [];

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
        }
      });
  }

  sendCardId(cardId: number) {
    this.cardId.emit(cardId);
  }
  
  drop(event: CdkDragDrop<TaskInterface[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
