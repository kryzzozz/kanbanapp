import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubTaskInterface, TaskInterface } from '../../types/kanban.interface';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent {
  @Input() task?: TaskInterface;
  @Output() cardId = new EventEmitter<number>();

  constructor() {}

  getCompletedSubtasksCount(subtasks: SubTaskInterface[]): number {
    return subtasks.filter(subtask => subtask.completed).length;
  }

  sendCardId(cardId: number) {
    this.cardId.emit(cardId);
  }

}
