import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  isDarkTheme: boolean = false;

  getThemeMode(isDarkTheme: boolean) {
    this.isDarkTheme = isDarkTheme;
  }

}
