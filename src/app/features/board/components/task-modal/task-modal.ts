import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BoardStore } from '../../store/board.store';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
})
export class TaskModalComponent {
  readonly store = inject(BoardStore);
  private fb = inject(FormBuilder);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    subtasks: this.fb.array([this.fb.control('', Validators.required)]),
    status: ['Todo', Validators.required]
  });

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control('', Validators.required));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.store.addTask(this.taskForm.value);
    }
  }
}