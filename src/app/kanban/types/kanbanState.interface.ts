import { KanbanBoardInterface } from "./kanban.interface";

export interface KanbanStateInterface {
    isLoading: boolean;
    kanban: KanbanBoardInterface;
    error: string | null;
    displayVisibilityIcon: boolean;
    darkTheme: boolean;
    selectedBoardId: number;
}