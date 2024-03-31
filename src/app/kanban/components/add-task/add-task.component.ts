import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {OverlayContainer} from '@angular/cdk/overlay';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Status {
  id: number,
  title: string,
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{

  taskForm: FormGroup;
  

  statuses: Status[] = [
    { id: 1, title: 'TODO' },
    { id: 2, title: 'DOING' },
    { id: 3, title: 'DONE' },
  ];

  selected = this.statuses[1].id;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private overlayContainer: OverlayContainer,
  ) {

    this.taskForm = this._fb.group({
      title: '',
      description: '',
      status: 0,
      id: 0,
      subtasks: this._fb.array([
        this._fb.control(null)
      ]),
    })
  }
  ngOnInit(): void {

    this.removeThemeIfExist();
    
    if (this.data && this.data.setThemeColor) {
      this.overlayContainer.getContainerElement().classList.add(this.data.setThemeColor);
      }
  }

  removeThemeIfExist() {
    this.overlayContainer.getContainerElement().classList.forEach((value: any, key: number) => {
      if(value === "theme-dark")
      this.overlayContainer.getContainerElement().classList.remove(value);
    });
  }

  getsubtasks(): AbstractControl[] {
    return (<FormArray> this.taskForm.get('subtasks')).controls;
  }

  addTask() {
    (this.taskForm.get('subtasks') as FormArray).push(this._fb.control(null));
  }

  removeTask(index: any) {
    (this.taskForm.get('subtasks') as FormArray).removeAt(index);
  }

  onFormSubmit() {
    if(this.taskForm.valid) {
      const payload: any = this.taskForm.value;
    }
  }

}
