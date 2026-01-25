import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardStore } from '../../store/board.store';
import { CompletedSubtaskDirective } from '../../../../design-system/directives/completed-subtask';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CompletedSubtaskDirective],
  templateUrl: './task-detail-modal.html',
  styleUrl: './task-detail-modal.scss',
})
export class TaskDetailModalComponent {
  readonly store = inject(BoardStore);

  completedCount = computed(() => {
    const task = this.store.selectedTask();
    return task ? task.subtasks.filter(s => s.isCompleted).length : 0;
  });
}