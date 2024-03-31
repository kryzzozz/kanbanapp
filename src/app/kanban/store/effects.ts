import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as KanbanActions from './actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { KanbanService } from "../services/kanban.service";

@Injectable()

export class KanbanEffects {
    getKanban$ = createEffect(() =>
        this.actions$.pipe(
            ofType(KanbanActions.getKanbanBoards),
            mergeMap(() => {
                return this.kanbanService
                .getBoards()
                .pipe(map((kanban) => KanbanActions.getKanbanBoardsSuccess({ kanban })),
                catchError((error) =>
                    of(KanbanActions.getKanbanBoardsFailure({ error: error.message }))
                ));
            }))
    );
    
    constructor(private actions$: Actions, private kanbanService: KanbanService) {}

}