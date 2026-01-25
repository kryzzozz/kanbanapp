// src/app/core/layout/main-layout.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../design-system/organisms/sidebar/sidebar';
import { HeaderComponent } from '../../design-system/organisms/header/header';
import { BoardStore } from '../../features/board/store/board.store';
import { TaskModalComponent } from '../../features/board/components/task-modal/task-modal';
import { TaskDetailModalComponent } from '../../features/board/components/task-detail-modal/task-detail-modal';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, TaskModalComponent, TaskDetailModalComponent],
  template: `
    <div class="app-layout">
      <app-header [boardName]="store.currentBoard()?.name || ''"></app-header>
      
      <div class="main-content">
        <app-sidebar class="sidebar-wrapper"></app-sidebar>
        
        <main class="board-wrapper">
           <router-outlet></router-outlet>
        </main>
      </div>

      @if (store.isTaskModalOpen()) {
        <app-task-modal></app-task-modal>
      }

      @if (store.selectedTask()) {
        <app-task-detail-modal></app-task-detail-modal>
      }
    </div>
  `,
  styles: [`
    .app-layout {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }
    .board-wrapper {
      flex: 1;
      background-color: var(--very-dark-bg);
      overflow: auto;
    }
    .sidebar-wrapper {
      height: 100%;
    }
  `]
})
export class MainLayoutComponent {
  readonly store = inject(BoardStore);
}