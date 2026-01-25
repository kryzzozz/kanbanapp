// src/app/design-system/directives/completed-subtask.directive.ts
import { Directive, ElementRef, input, effect, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCompletedSubtask]',
  standalone: true
})
export class CompletedSubtaskDirective {
  isCompleted = input.required<boolean>({ alias: 'appCompletedSubtask' });

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      if (this.isCompleted()) {
        this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'line-through');
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
        this.renderer.setStyle(this.el.nativeElement, 'color', 'var(--medium-grey)');
      } else {
        this.renderer.removeStyle(this.el.nativeElement, 'text-decoration');
        this.renderer.removeStyle(this.el.nativeElement, 'opacity');
        this.renderer.setStyle(this.el.nativeElement, 'color', 'var(--text-main)');
      }
    });
  }
}