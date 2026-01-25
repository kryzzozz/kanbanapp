// src/app/features/board/pages/board-view.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { BoardStore } from '../../store/board.store';
import { TaskCardComponent } from '../../components/task-card/task-card';
import { StatusBadgeComponent } from '../../../../design-system/atoms/status-badge/status-badge';

@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [
    CommonModule, 
    CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder,
    TaskCardComponent, 
    StatusBadgeComponent
  ],
  templateUrl: './board-view.html',
  styleUrl: './board-view.scss',
})
export class BoardViewComponent {
  readonly store = inject(BoardStore);

  onDrop(event: CdkDragDrop<any[]>) {
    this.store.moveTask(
      event.previousContainer.id,
      event.container.id,
      event.previousIndex,
      event.currentIndex
    );
  }
}