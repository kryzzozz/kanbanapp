// src/app/design-system/atoms/status-badge.component.ts
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss'
})
export class StatusBadgeComponent {
  label = input.required<string>();

  color = computed(() => {
    switch (this.label().toLowerCase()) {
      case 'todo': return 'var(--color-todo)';
      case 'doing': return 'var(--color-doing)';
      case 'done': return 'var(--color-done)';
      default: return 'var(--medium-grey)';
    }
  });
}