// src/app/features/board/components/task-card.component.ts
import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/models/board.model';
import { BoardStore } from '../../store/board.store';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCardComponent {
  task = input.required<Task>();
  readonly store = inject(BoardStore);

  totalSubtasks = computed(() => this.task().subtasks.length);
  
  completedSubtasks = computed(() => 
    this.task().subtasks.filter(t => t.isCompleted).length
  );
}