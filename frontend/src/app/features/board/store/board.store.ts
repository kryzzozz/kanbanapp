import { patchState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
import { computed, effect, inject } from '@angular/core';
import { Board, Task, TaskStatus } from '../../../core/models/board.model';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from '../../../core/services/api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of, debounceTime } from 'rxjs';

type BoardState = {
  boards: Board[];
  currentBoardId: string | null;
  isTaskModalOpen: boolean;
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: BoardState = {
  boards: [],
  currentBoardId: null,
  isTaskModalOpen: false,
  selectedTaskId: null,
  loading: false,
  error: null
};

const LAST_BOARD_KEY = 'kanban-last-board-id';

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

  withMethods((store, apiService = inject(ApiService)) => {
    
    const syncBoard = rxMethod<Board>(
      pipe(
        debounceTime(300),
        switchMap((board) => apiService.updateBoard(board.id, board).pipe(
          catchError(err => {
            console.error('Error syncing board', err);
            return of(null);
          })
        ))
      )
    );

    return {
      loadBoards: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(() => apiService.getBoards().pipe(
            tap((boards) => {
              const lastBoardId = localStorage.getItem(LAST_BOARD_KEY);
              
              let boardToSelect = boards.length > 0 ? boards[0].id : null;
              if (lastBoardId && boards.some(b => b.id === lastBoardId)) {
                boardToSelect = lastBoardId;
              }

              patchState(store, { 
                boards, 
                loading: false, 
                currentBoardId: boardToSelect 
              });
            }),
            catchError((err) => {
              patchState(store, { loading: false, error: 'Failed to load boards' });
              console.error(err);
              return of([]);
            })
          ))
        )
      ),

      createNewBoard: rxMethod<Board>(
        pipe(
          switchMap((newBoard) => apiService.createBoard(newBoard).pipe(
            tap((createdBoard) => {
              patchState(store, (state) => ({
                boards: [...state.boards, createdBoard],
                currentBoardId: createdBoard.id
              }));
            })
          ))
        )
      ),

      selectBoard(boardId: string) {
        patchState(store, { currentBoardId: boardId });
        localStorage.setItem(LAST_BOARD_KEY, boardId);
      },

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
            movedTask.status = currentContainerId as TaskStatus;
          }

          const updatedBoard = { ...board, columns: updatedColumns };

          patchState(store, (state) => ({
            boards: state.boards.map(b => b.id === board.id ? updatedBoard : b)
          }));

          syncBoard(updatedBoard);
        }
      },

      addTask(taskFormValue: any) {
        const board = store.currentBoard();
        if (!board) return;

        const newTask: Task = {
          id: crypto.randomUUID(),
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

        const updatedBoard = { ...board, columns: updatedColumns };

        patchState(store, (state) => ({
          boards: state.boards.map(b => b.id === board.id ? updatedBoard : b),
          isTaskModalOpen: false
        }));

        syncBoard(updatedBoard);
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

        const updatedBoard = { ...board, columns: updatedColumns };

        patchState(store, (state) => ({
          boards: state.boards.map(b => b.id === board.id ? updatedBoard : b)
        }));

        syncBoard(updatedBoard);
      },

      updateTaskStatus(taskId: string, newStatus: string) {
        const board = store.currentBoard();
        if (!board) return;
  
        let taskToMove: Task | undefined;
        let currentColumns = board.columns.map(col => {
            const taskIndex = col.tasks.findIndex(t => t.id === taskId);
            if (taskIndex > -1) {
                taskToMove = { ...col.tasks[taskIndex], status: newStatus as TaskStatus };
                return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
            }
            return col;
        });
  
        if (taskToMove) {
            currentColumns = currentColumns.map(col => {
                if (col.name === newStatus) {
                    return { ...col, tasks: [...col.tasks, taskToMove!] };
                }
                return col;
            });
  
            const updatedBoard = { ...board, columns: currentColumns };

            patchState(store, (state) => ({
                boards: state.boards.map(b => b.id === board.id ? updatedBoard : b)
            }));

            syncBoard(updatedBoard);
        }
      },

      openTaskModal() { patchState(store, { isTaskModalOpen: true }); },
      closeTaskModal() { patchState(store, { isTaskModalOpen: false }); },
      viewTask(taskId: string) { patchState(store, { selectedTaskId: taskId }); },
      closeViewTask() { patchState(store, { selectedTaskId: null }); },
    };
  }),

  withHooks({
    onInit(store) {
      store.loadBoards();
    }
  })
);