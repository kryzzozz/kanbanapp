import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './components/kanban/kanban.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'


@NgModule({
  declarations: [
    KanbanComponent,
    MainContentComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,

  ],
  exports: [
    KanbanComponent
  ]
})
export class KanbanModule { }
