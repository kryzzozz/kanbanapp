import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnInterface, KanbanBoardInterface, TaskInterface } from '../../types/kanban.interface';
import { Observable, Subscription, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as KanbanActions from '../../store/actions';
import { displayVisibilityIconSelector, errorSelector, isDarkThemeSelector, isLoadingSelector, kanbanSelector, selectedBoardId } from '../../store/selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  @Output() displayedDrawer = new EventEmitter<boolean>();

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedBoardId$: Observable<number>;
  kanbanBoards$: Observable<KanbanBoardInterface>;
  displayVisibilityIcon$: Observable<boolean>;
  isDarkTheme$: Observable<boolean>;
  kanbanSubcription: Subscription = new Subscription();
  isDarkTheme: boolean = false;

  columns: ColumnInterface[] = [];
  tasks: TaskInterface[] = [];

  constructor(
    private store: Store<AppStateInterface>,
    private _dialog: MatDialog,
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.selectedBoardId$ = this.store.pipe(select(selectedBoardId));
    this.kanbanBoards$ = this.store.pipe(select(kanbanSelector));
    this.displayVisibilityIcon$ = this.store.pipe(select(displayVisibilityIconSelector));
    this.isDarkTheme$ = this.store.pipe(select(isDarkThemeSelector));
    
    // if(this.selectedBoardId$) {
    //   this.selectedBoardId$.subscribe((selectedBoardId) => {
    //     if(this.kanbanBoards$)
    //       this.kanbanSubcription = this.kanbanBoards$.subscribe((kanbanBoards) => {
    //         if(kanbanBoards.boards[selectedBoardId] && kanbanBoards.boards[selectedBoardId].columns.length > 0) {
    //           this.tasks = kanbanBoards.boards[selectedBoardId].tasks;
    //           this.columns = kanbanBoards.boards[selectedBoardId].columns;
    //         }
    //   });
    //   })
    // }

    if(this.kanbanBoards$)
      this.kanbanSubcription = this.kanbanBoards$.subscribe((kanbanBoards) => {
        if(kanbanBoards.boards[0] && kanbanBoards.boards[0].columns.length > 0) {
          this.tasks = kanbanBoards.boards[0].tasks;
          this.columns = kanbanBoards.boards[0].columns;
        }
      });

    if(this.isDarkTheme$)
      this.kanbanSubcription = this.isDarkTheme$.subscribe((darkTheme) => {
        this.isDarkTheme = darkTheme;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(KanbanActions.getKanbanBoards());
  }

  addNewTask() {
    const dialogRef = this._dialog.open(AddTaskComponent, {
        width: '600px',
        disableClose: true,
        data : {
          setThemeColor: this.isDarkTheme ? "theme-dark" : "",
      },
    });
  }

  openTask(taskId: number) {
    const taskWithId = this.tasks.find(task => task.id === taskId);

    const dialogRef = this._dialog.open(UpdateTaskComponent, {
      width: '500px',
      data : {
        setThemeColor: this.isDarkTheme ? "theme-dark" : "",
        task: taskWithId,
      },
    });
  }

  displayDrawer() {
    this.displayedDrawer.emit(true);
    this.store.dispatch(KanbanActions.displayVisibilityIcon());
  }
}
