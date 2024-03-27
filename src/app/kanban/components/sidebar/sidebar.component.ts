import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() themeDarkMode = new EventEmitter<boolean>();

  isDarkTheme: boolean = false;

  sendThemeDarkMode() {
    this.themeDarkMode.emit(this.isDarkTheme);
  }

}
