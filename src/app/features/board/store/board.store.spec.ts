import { TestBed } from '@angular/core/testing';
import { BoardStore } from './board.store';
import { Board } from '../../../core/models/board.model';

describe('BoardStore (Critical Path)', () => {
  let store: any;

  const mockBoard: Board = {
    id: '1',
    name: 'Test Board',
    columns: [
      {
        name: 'Todo',
        tasks: [
          { id: 't1', title: 'Task 1', status: 'Todo', subtasks: [] }
        ]
      },
      {
        name: 'Done',
        tasks: []
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardStore]
    });
    
    store = TestBed.inject(BoardStore);
    
    store.loadFromStorage([mockBoard]);
  });

  it('should initialize with the correct board', () => {
    expect(store.currentBoard().name).toBe('Test Board');
    expect(store.currentBoard().columns.length).toBe(2);
  });

  it('should add a new task to the correct column', () => {
    const newTaskForm = {
      title: 'New Feature',
      description: '',
      status: 'Todo',
      subtasks: []
    };
    store.addTask(newTaskForm);

    const todoColumn = store.currentBoard().columns.find((c: any) => c.name === 'Todo');
    expect(todoColumn.tasks.length).toBe(2);
    expect(todoColumn.tasks[1].title).toBe('New Feature');
  });

  it('should move a task from Todo to Done (Drag & Drop Logic)', () => {
    const initialTodo = store.currentBoard().columns.find((c: any) => c.name === 'Todo');
    expect(initialTodo.tasks.length).toBe(1);

    store.moveTask('Todo', 'Done', 0, 0);

    const updatedTodo = store.currentBoard().columns.find((c: any) => c.name === 'Todo');
    const updatedDone = store.currentBoard().columns.find((c: any) => c.name === 'Done');

    expect(updatedTodo.tasks.length).toBe(0);
    expect(updatedDone.tasks.length).toBe(1);
    expect(updatedDone.tasks[0].status).toBe('Done');
  });

  it('should toggle a subtask completion status', () => {
    const taskWithSub = {
      title: 'Task Sub',
      status: 'Todo',
      subtasks: ['Sub 1']
    };
    store.addTask(taskWithSub);
    
    const task = store.currentBoard().columns[0].tasks[1];
    
    store.toggleSubtask(task.id, 0);

    const updatedTask = store.currentBoard().columns[0].tasks[1];
    expect(updatedTask.subtasks[0].isCompleted).toBe(true);
  });
});