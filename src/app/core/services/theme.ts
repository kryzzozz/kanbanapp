import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<'light' | 'dark'>('dark');
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();

      effect(() => {
        if (this.theme() === 'light') {
          document.body.classList.add('light-theme');
        } else {
          document.body.classList.remove('light-theme');
        }
        localStorage.setItem('theme', this.theme());
      });
    }
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.theme.set(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.theme.set(prefersDark ? 'dark' : 'light');
  }

  toggleTheme() {
    this.theme.update(current => current === 'dark' ? 'light' : 'dark');
  }
}