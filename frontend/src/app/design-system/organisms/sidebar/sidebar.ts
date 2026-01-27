// src/app/design-system/organisms/sidebar.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardStore } from '../../../features/board/store/board.store';
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  readonly store = inject(BoardStore);
  readonly themeService = inject(ThemeService);
}