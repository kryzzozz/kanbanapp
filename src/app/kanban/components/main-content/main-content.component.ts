import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnInterface, KanbanBoardInterface } from '../../types/kanban.interface';
import { Observable, Subscription, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as KanbanActions from '../../store/actions';
import { displayVisibilityIconSelector, errorSelector, isDarkThemeSelector, isLoadingSelector, kanbanSelector } from '../../store/selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  @Output() displayedDrawer = new EventEmitter<boolean>();

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  kanbanBoards$: Observable<KanbanBoardInterface>;
  displayVisibilityIcon$: Observable<boolean>;
  isDarkTheme$: Observable<boolean>;
  kanbanSubcription: Subscription = new Subscription();
  isDarkTheme: boolean = false;

  kanbanBoard: KanbanBoardInterface = {
    boards: [
      {
        id: 1,
        name: "Platform Launch",
        columns: [
          {
            id: 1,
            title: 'TODO',
            order: 1, 
            iconColor: 'blue',
            tasks: [
              {
                id: 1,
                title: 'Build UI for onboarding flow',
                description: 'Create login page with email and password fields',
                status: 'TODO',
                order: 1, 
                subTasks: []
              },
              {
                id: 2,
                title: 'Design landing page',
                description: 'Create mockups for landing page layout',
                status: 'TODO',
                order: 2, 
                subTasks: [
                  { id: 1, title: 'Design hero section', completed: false },
                  { id: 2, title: 'Create call-to-action button', completed: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: 'DOING',
            order: 2, 
            iconColor: 'purple',
            tasks: [
              {
                id: 3,
                title: 'Develop API endpoints',
                description: 'Implement RESTful API for data retrieval',
                status: 'DOING',
                order: 1, 
                subTasks: [
                  { id: 1, title: 'Define API routes', completed: false },
                  { id: 2, title: 'Implement authentication middleware', completed: true }
                ]
              }
            ]
          },
          {
            id: 3,
            title: 'DONE',
            order: 3, 
            iconColor: 'green',
            tasks: [
              {
                id: 4,
                title: 'Refactor codebase',
                description: 'Cleanup code and improve code quality',
                status: 'DONE',
                order: 1, 
                subTasks: []
              }
            ]
          }
        ]
      }, //board Platform Launch
      {
        id: 2,
        name: "Marketing Plan",
        columns: [
          {
            id: 1,
            title: 'TODO',
            order: 1, 
            iconColor: 'blue',
            tasks: [
              {
                id: 1,
                title: 'Build UI for onboarding flow',
                description: 'Create login page with email and password fields',
                status: 'TODO',
                order: 1, 
                subTasks: []
              },
              {
                id: 2,
                title: 'Design landing page',
                description: 'Create mockups for landing page layout',
                status: 'TODO',
                order: 2, 
                subTasks: [
                  { id: 1, title: 'Design hero section', completed: false },
                  { id: 2, title: 'Create call-to-action button', completed: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: 'DOING',
            order: 2, 
            iconColor: 'purple',
            tasks: [
              {
                id: 3,
                title: 'Develop API endpoints',
                description: 'Implement RESTful API for data retrieval',
                status: 'DOING',
                order: 1, 
                subTasks: [
                  { id: 1, title: 'Define API routes', completed: false },
                  { id: 2, title: 'Implement authentication middleware', completed: true }
                ]
              }
            ]
          },
          {
            id: 3,
            title: 'DONE',
            order: 3, 
            iconColor: 'green',
            tasks: [
              {
                id: 4,
                title: 'Refactor codebase',
                description: 'Cleanup code and improve code quality',
                status: 'DONE',
                order: 1, 
                subTasks: []
              }
            ]
          }
        ]
      } //board Marketing Plan

    ]
  };

  columns: ColumnInterface[] = [];

  constructor(
    private store: Store<AppStateInterface>,
    private _dialog: MatDialog,
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.kanbanBoards$ = this.store.pipe(select(kanbanSelector));
    this.displayVisibilityIcon$ = this.store.pipe(select(displayVisibilityIconSelector));
    this.isDarkTheme$ = this.store.pipe(select(isDarkThemeSelector));
    
    if(this.kanbanBoards$)
    this.kanbanSubcription = this.kanbanBoards$.subscribe((kanbanBoards) => {
      if(kanbanBoards.boards[0] && kanbanBoards.boards[0].columns.length > 0) {
        this.columns = kanbanBoards.boards[0].columns;
        const maxId = Math.max(...this.columns[0].tasks.map(task => task.id));
        console.log('el max', maxId + 1);
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
        data : {
          setThemeColor: this.isDarkTheme ? "theme-dark" : "",
      },
    });
  }

  openTask(taskId: number) {
    console.log('id del task', taskId);
  }

  displayDrawer() {
    this.displayedDrawer.emit(true);
    this.store.dispatch(KanbanActions.displayVisibilityIcon());
  }
}
