// src/app/design-system/organisms/sidebar.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardStore } from '../../../features/board/store/board.store';
import { ThemeService } from '../../../core/services/theme';
import { Board } from '../../../core/models/board.model';
import { AboutModalComponent } from '../../../core/components/about-modal/about-modal.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AboutModalComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  readonly store = inject(BoardStore);
  readonly themeService = inject(ThemeService);

  showAboutModal = false;

  createBoard() {
    const boardName = window.prompt('Enter the new board name:');
    
    if (!boardName) return; 

    const newBoard: Board = {
      id: '',
      name: boardName,
      columns: [
        { name: 'Todo', tasks: [] },
        { name: 'Doing', tasks: [] },
        { name: 'Done', tasks: [] }
      ]
    };

    this.store.createNewBoard(newBoard);
  }
}