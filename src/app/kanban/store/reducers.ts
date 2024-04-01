import { createReducer, on } from "@ngrx/store";
import { KanbanStateInterface } from "../types/kanbanState.interface";
import * as KanbanActions from './actions';

export const initialState: KanbanStateInterface = {
    isLoading: false,
    kanban: { boards: [] },
    error: null,
    displayVisibilityIcon: false,
    darkTheme: false,
};

export const reducers = createReducer(
    initialState, 
    on(KanbanActions.getKanbanBoards, (state) => ({ ...state, isLoading: true })),
    on(KanbanActions.getKanbanBoardsSuccess, (state, action) => ({ 
        ...state, 
        isLoading: false,
        kanban: action.kanban,
    })),
    on(KanbanActions.getKanbanBoardsFailure, (state, action) => ({ 
        ...state, 
        isLoading: false,
        error: action.error,
    })),
    on(KanbanActions.displayVisibilityIcon, (state) => ({ ...state, displayVisibilityIcon: !state.displayVisibilityIcon })),
    on(KanbanActions.setDarkTheme, (state, action) => ({
        ...state,
        darkTheme: action.darkTheme,
    })),
    on(KanbanActions.addTaskActionSuccess, (state, action) => ({ 
        ...state, 
        kanban: {
            ...state.kanban,
            boards: action.updatedBoards
        }
    })),
    on(KanbanActions.updateTaskStatus, (state, { taskId, statusId }) => {
        const updatedBoards = state.kanban.boards.map(board => {
            const updatedTasks = board.tasks.map(task => {
              if (task.id === taskId) {
                return { ...task, status: statusId };
              }
              return task;
            });
            return { ...board, tasks: updatedTasks };
        });
        return { ...state, kanban: { ...state.kanban, boards: updatedBoards }};
    }),
    on(KanbanActions.updateSubTaskCompletedStatus, (state, { taskId, subTaskId, completed }) => {
        const updatedBoards = state.kanban.boards.map(board => {
            const updatedTasks = board.tasks.map(task => {
                if (task.id === taskId) {
                    const updatedSubTasks = task.subTasks.map(subTask => {
                        if (subTask.id === subTaskId) {
                            return { ...subTask, completed: completed };
                        }
                        return subTask;
                    });
                    return { ...task, subTasks: updatedSubTasks };
                }
                return task;
            });
            return { ...board, tasks: updatedTasks };
        });
        return { ...state, kanban: { ...state.kanban, boards: updatedBoards }};
    }),
    on(KanbanActions.updateLocalStorage, (state) => { 
        setTimeout(() => { localStorage.setItem('kanbanDB', JSON.stringify(state.kanban)) }, 500);
        return {
            ...state, 
        };
    }),
    
);