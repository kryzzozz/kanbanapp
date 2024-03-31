import { createReducer, on } from "@ngrx/store";
import { KanbanStateInterface } from "../types/kanbanState.interface";
import * as KanbanActions from './actions';
import { Action } from "rxjs/internal/scheduler/Action";

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
);