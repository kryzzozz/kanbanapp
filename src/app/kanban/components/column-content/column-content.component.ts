import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnInterface } from '../../types/kanban.interface';

@Component({
  selector: 'app-column-content',
  templateUrl: './column-content.component.html',
  styleUrls: ['./column-content.component.scss']
})
export class ColumnContentComponent {
  @Input() columnContent?: ColumnInterface;
  @Output() cardId = new EventEmitter<number>();

  constructor() {}

  sendCardId(cardId: number) {
    this.cardId.emit(cardId);
  }

}
