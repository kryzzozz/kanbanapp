import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './components/kanban/kanban.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { ColumnContentComponent } from './components/column-content/column-content.component';
import { CardContentComponent } from './components/card-content/card-content.component';


@NgModule({
  declarations: [
    KanbanComponent,
    MainContentComponent,
    SidebarComponent,
    ColumnContentComponent,
    CardContentComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    

  ],
  exports: [
    KanbanComponent
  ]
})
export class KanbanModule { }
