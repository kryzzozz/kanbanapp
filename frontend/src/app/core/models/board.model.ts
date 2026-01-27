// src/app/core/models/board.model.ts

export type TaskStatus = 'Todo' | 'Doing' | 'Done';

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  subtasks: Subtask[];
}

export interface Column {
  name: TaskStatus | string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}