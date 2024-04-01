import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/types/appState.interface";
import { BoardInterface } from "../types/kanban.interface";

export const selectFeature = (state: AppStateInterface) => state.kanban;

export const isLoadingSelector = createSelector(
    selectFeature, 
    (state) => state.isLoading
);

export const kanbanSelector = createSelector(
    selectFeature, 
    (state) => state.kanban
);

export const errorSelector = createSelector(
    selectFeature, 
    (state) => state.error
);

export const displayVisibilityIconSelector = createSelector(
    selectFeature,
    (state) => state.displayVisibilityIcon
);

export const isDarkThemeSelector = createSelector(
    selectFeature,
    (state) => state.darkTheme
);

export const selectBoardInfo = createSelector(
    selectFeature,
    (state) => state.kanban.boards
);

export const selectBoardNames = createSelector(
    selectBoardInfo,
    (boards: BoardInterface[]): { id: number; name: string }[] => boards.map(board => ({ id: board.id, name: board.name }))
);

export const selectedBoardId = createSelector(
    selectFeature,
    (state) => state.selectedBoardId
);