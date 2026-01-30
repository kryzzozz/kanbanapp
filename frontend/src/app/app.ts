import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardStore } from './features/board/store/board.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('kanban-pro');
  readonly store = inject(BoardStore);
}
