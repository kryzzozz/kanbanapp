import { createAction, props } from "@ngrx/store";
import { KanbanBoardInterface } from "../types/kanban.interface";

export const getKanbanBoards = createAction('[Kanban] Get Kanban Boards');
export const getKanbanBoardsSuccess = createAction(
    '[Kanban] Get Kanban Boards Success', 
    props<{ kanban: KanbanBoardInterface }>()
);
export const getKanbanBoardsFailure = createAction(
    '[Kanban] Get Kanban Boards Failure',
    props<{ error: string }>()
);
export const displayVisibilityIcon = createAction('[Kanban] Display Visibility Icon');
export const setDarkTheme = createAction(
    '[Kanban] Set Theme Color',
    props<{ darkTheme: boolean }>()
);