import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as KanbanActions from '../../store/actions';
import { Observable } from 'rxjs';
import { BoardInterface, KanbanBoardInterface } from '../../types/kanban.interface';
import { kanbanSelector, selectBoardInfo, selectedBoardId } from '../../store/selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() themeDarkMode = new EventEmitter<boolean>();
  @Output() hiddenDrawer = new EventEmitter<boolean>();

  kanbanBoards$: Observable<KanbanBoardInterface>;
  boardsInfo$: Observable<BoardInterface[]>;
  selectedBoardId$: Observable<number>;

  isDarkTheme: boolean = false;
  totalBoards: number = 0;
  boardSelected: number = 1;

  constructor(
    private store: Store<AppStateInterface>,
  ) {
    this.kanbanBoards$ = this.store.pipe(select(kanbanSelector));
    this.boardsInfo$ = this.store.pipe(select(selectBoardInfo));
    this.selectedBoardId$ = this.store.pipe(select(selectedBoardId));
  }

  ngOnInit(): void {
    this.boardsInfo$.subscribe(boards => {
      this.totalBoards = boards.length;
    });
  }

  sendThemeDarkMode() {
    this.themeDarkMode.emit(this.isDarkTheme);
    this.store.dispatch(KanbanActions.setDarkTheme({ darkTheme: this.isDarkTheme }));
  }

  hideDrawer() {
    this.hiddenDrawer.emit(false);
    this.store.dispatch(KanbanActions.displayVisibilityIcon());
  }

  changeBoard(boardId: number) {
    this.store.dispatch(KanbanActions.setSelectedBoardId({ selectedBoardId: boardId }));
  }

}
