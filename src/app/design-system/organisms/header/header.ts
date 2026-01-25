// src/app/design-system/organisms/header.component.ts
import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardStore } from '../../../features/board/store/board.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  boardName = input.required<string>();
  readonly store = inject(BoardStore);
}