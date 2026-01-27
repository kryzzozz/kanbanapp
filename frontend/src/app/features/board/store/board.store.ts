// src/app/features/board/store/board.store.ts
import { patchState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
import { computed, effect, inject } from '@angular/core';
import { Board, Task, Column } from '../../../core/models/board.model';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

type BoardState = {
  boards: Board[];
  currentBoardId: string | null;
  isTaskModalOpen: boolean;
  selectedTaskId: string | null;
};

const initialState: BoardState = {
  boards: [
    {
      id: '1',
      name: 'Platform Launch',
      columns: [
        {
          name: 'Todo',
          tasks: [
            { id: 't1', title: 'Build UI for onboarding', status: 'Todo', subtasks: [] },
            { id: 't2', title: 'Build UI for search', status: 'Todo', subtasks: [] }
          ]
        },
        {
          name: 'Doing',
          tasks: [
            { id: 't3', title: 'Design settings', status: 'Doing', subtasks: [{ title: 'Sub 1', isCompleted: true }] }
          ]
        },
        {
          name: 'Done',
          tasks: []
        }
      ]
    }
  ],
  currentBoardId: '1',
  isTaskModalOpen: false,
  selectedTaskId: null,
};

const BOARD_STORAGE_KEY = 'kanban-boards';

export const BoardStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  
  withComputed(({ boards, currentBoardId, selectedTaskId }) => ({
    currentBoard: computed(() => 
      boards().find(b => b.id === currentBoardId()) || null
    ),
    selectedTask: computed(() => {
      const board = boards().find(b => b.id === currentBoardId());
      if (!board || !selectedTaskId()) return null;
      
      for (const column of board.columns) {
        const task = column.tasks.find(t => t.id === selectedTaskId());
        if (task) return task;
      }
      return null;
    })
  })),

  withMethods((store) => ({
    moveTask(previousContainerId: string, currentContainerId: string, previousIndex: number, currentIndex: number) {
      const board = store.currentBoard();
      if (!board) return;

      const updatedColumns = board.columns.map(col => ({
        ...col,
        tasks: [...col.tasks]
      }));

      const prevCol = updatedColumns.find(c => c.name === previousContainerId);
      const currCol = updatedColumns.find(c => c.name === currentContainerId);

      if (prevCol && currCol) {
        if (previousContainerId === currentContainerId) {
          moveItemInArray(currCol.tasks, previousIndex, currentIndex);
        } else {
          transferArrayItem(prevCol.tasks, currCol.tasks, previousIndex, currentIndex);
          const movedTask = currCol.tasks[currentIndex];
          movedTask.status = currentContainerId as any; 
        }

        patchState(store, (state) => ({
          boards: state.boards.map(b => 
            b.id === board.id ? { ...b, columns: updatedColumns } : b
          )
        }));
      }
    },

    selectBoard(boardId: string) {
      patchState(store, { currentBoardId: boardId });
    },
    
    loadFromStorage(boards: Board[]) {
        patchState(store, { boards });
    },

    openTaskModal() {
      patchState(store, { isTaskModalOpen: true });
    },

    closeTaskModal() {
      patchState(store, { isTaskModalOpen: false });
    },

    addTask(taskFormValue: any) {
      const board = store.currentBoard();
      if (!board) return;

      const newTask: Task = {
        id: Date.now().toString(),
        title: taskFormValue.title,
        description: taskFormValue.description,
        status: taskFormValue.status,
        subtasks: taskFormValue.subtasks.map((st: string) => ({
          title: st,
          isCompleted: false
        }))
      };

      const updatedColumns = board.columns.map(col => {
        if (col.name === newTask.status) {
          return { ...col, tasks: [...col.tasks, newTask] };
        }
        return col;
      });

      patchState(store, (state) => ({
        boards: state.boards.map(b => 
          b.id === board.id ? { ...b, columns: updatedColumns } : b
        ),
        isTaskModalOpen: false
      }));
    },

    viewTask(taskId: string) {
      patchState(store, { selectedTaskId: taskId });
    },

    closeViewTask() {
      patchState(store, { selectedTaskId: null });
    },

    toggleSubtask(taskId: string, subtaskIndex: number) {
      const board = store.currentBoard();
      if (!board) return;

      const updatedColumns = board.columns.map(col => ({
        ...col,
        tasks: col.tasks.map(task => {
          if (task.id !== taskId) return task;

          const updatedSubtasks = [...task.subtasks];
          updatedSubtasks[subtaskIndex] = {
            ...updatedSubtasks[subtaskIndex],
            isCompleted: !updatedSubtasks[subtaskIndex].isCompleted
          };

          return { ...task, subtasks: updatedSubtasks };
        })
      }));

      patchState(store, (state) => ({
        boards: state.boards.map(b => 
          b.id === board.id ? { ...b, columns: updatedColumns } : b
        )
      }));
    },

    updateTaskStatus(taskId: string, newStatus: string) {
        const board = store.currentBoard();
        if (!board) return;

        let taskToMove: Task | undefined;
        let currentColumns = board.columns.map(col => {
            const taskIndex = col.tasks.findIndex(t => t.id === taskId);
            if (taskIndex > -1) {
                taskToMove = col.tasks[taskIndex];
                return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
            }
            return col;
        });

        if (taskToMove) {
            taskToMove = { ...taskToMove, status: newStatus as any };
            
            currentColumns = currentColumns.map(col => {
                if (col.name === newStatus) {
                    return { ...col, tasks: [...col.tasks, taskToMove!] };
                }
                return col;
            });

            patchState(store, (state) => ({
                boards: state.boards.map(b => 
                    b.id === board.id ? { ...b, columns: currentColumns } : b
                )
            }));
        }
    }
  })),

  withHooks({
    onInit(store) {
      const savedBoards = localStorage.getItem(BOARD_STORAGE_KEY);
      if (savedBoards) {
        try {
          const parsedBoards = JSON.parse(savedBoards);
          store.loadFromStorage(parsedBoards);
        } catch (e) {
          console.error('Error parsing local storage', e);
        }
      }

      effect(() => {
        const boards = store.boards();
        localStorage.setItem(BOARD_STORAGE_KEY, JSON.stringify(boards));
      });
    }
  })
);