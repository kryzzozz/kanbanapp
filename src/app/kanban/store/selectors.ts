import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/types/appState.interface";

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