import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailModalComponent } from './task-detail-modal';

describe('TaskDetailModal', () => {
  let component: TaskDetailModalComponent;
  let fixture: ComponentFixture<TaskDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
