import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-content',
  templateUrl: './column-content.component.html',
  styleUrls: ['./column-content.component.scss']
})
export class ColumnContentComponent {
  @Input() columnContent: any;

  constructor() {}

}
