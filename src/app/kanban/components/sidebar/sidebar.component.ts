import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as KanbanActions from '../../store/actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() themeDarkMode = new EventEmitter<boolean>();
  @Output() hiddenDrawer = new EventEmitter<boolean>();

  isDarkTheme: boolean = false;

  constructor(
    private store: Store<AppStateInterface>,
  ) {

  }

  sendThemeDarkMode() {
    this.themeDarkMode.emit(this.isDarkTheme);
    this.store.dispatch(KanbanActions.setDarkTheme({ darkTheme: this.isDarkTheme }));
  }

  hideDrawer() {
    this.hiddenDrawer.emit(false);
    this.store.dispatch(KanbanActions.displayVisibilityIcon());
  }

}
