export interface SubTaskInterface {
    id: number;
    title: string;
    completed: boolean;
}

export interface TaskInterface {
    id: number;
    title: string;
    description: string;
    status: string;
    order: number;
    subTasks: SubTaskInterface[];
}

export interface ColumnInterface {
    id: number;
    title: string;
    order: number;
    iconColor: string;
    tasks: TaskInterface[];
}

export interface BoardInterface {
    id: number;
    name: string;
    columns: ColumnInterface[];
}

export interface KanbanBoardInterface {
    boards: BoardInterface[];
}
