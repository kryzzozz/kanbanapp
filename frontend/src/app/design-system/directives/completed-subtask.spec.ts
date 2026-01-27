import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedSubtaskDirective } from './completed-subtask';
import { By } from '@angular/platform-browser';

@Component({
  template: `<span [appCompletedSubtask]="isCompleted">Test Text</span>`,
  imports: [CompletedSubtaskDirective],
  standalone: true
})
class TestHostComponent {
  isCompleted = false;
}

describe('CompletedSubtaskDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let spanElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, CompletedSubtaskDirective]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TestHostComponent);
    spanElement = fixture.debugElement.query(By.css('span')).nativeElement;
  });

  it('should apply styles when isCompleted is true', async () => {
    fixture.componentInstance.isCompleted = true;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(spanElement.style.textDecoration).toBe('line-through');
  });

  it('should NOT apply styles when isCompleted is false', async () => {
    fixture.componentInstance.isCompleted = false;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(spanElement.style.textDecoration).toBe('');
  });
});