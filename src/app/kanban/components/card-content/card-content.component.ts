import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent {
  @Input() task: any;

  constructor() {}

  getCompletedSubtasksCount(subtasks: any[]): number {
    return subtasks.filter(subtask => subtask.completed).length;
  }

}
