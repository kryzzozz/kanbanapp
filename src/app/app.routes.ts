import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '', 
        loadComponent: () => import('./features/board/pages/board-view/board-view')
          .then(m => m.BoardViewComponent)
      }
    ]
  }
];