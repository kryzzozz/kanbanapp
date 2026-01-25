import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card';
import { BoardStore } from '../../store/board.store';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent],
      providers: [BoardStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('task', {
      id: '1',
      title: 'Test Task',
      status: 'Todo',
      subtasks: []
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});