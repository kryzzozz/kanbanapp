import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { KanbanBoardInterface } from '../../types/kanban.interface';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {

  kanbanBoard: KanbanBoardInterface = {
    boards: [
      {
        id: 1,
        name: "Platform Launch",
        columns: [
          { id: 1, title: 'TODO', order: 1, iconColor: 'blue', },
          { id: 2, title: 'DOING', order: 2, iconColor: 'purple', },
          { id: 3, title: 'DONE', order: 3, iconColor: 'green', }
        ],
        tasks: [
          {
            id: 1,
            title: 'Build UI for onboarding flow',
            description: 'Create login page with email and password fields',
            status: 1,
            order: 1, 
            subTasks: [
              { id: 1, title: 'Design login page layout', completed: false },
              { id: 2, title: 'Implement email input field', completed: false },
              { id: 3, title: 'Create password input field', completed: false }
            ]
          },
          {
            id: 2,
            title: 'Design landing page',
            description: 'Create mockups for landing page layout',
            status: 1,
            order: 2, 
            subTasks: [
              { id: 1, title: 'Design hero section', completed: false },
              { id: 2, title: 'Create call-to-action button', completed: false }
            ]
          },
          {
            id: 3,
            title: 'Develop API endpoints',
            description: 'Implement RESTful API for data retrieval',
            status: 2,
            order: 1, 
            subTasks: [
              { id: 1, title: 'Define API routes', completed: false },
              { id: 2, title: 'Implement authentication middleware', completed: true }
            ]
          },
          {
            id: 4,
            title: 'Refactor codebase',
            description: 'Cleanup code and improve code quality',
            status: 3,
            order: 1, 
            subTasks: [
              { id: 1, title: 'Optimize database queries', completed: false },
              { id: 2, title: 'Remove unused dependencies', completed: true }
            ]
          },
          {
            id: 5,
            title: 'Build UI for search',
            description: 'Design search input component',
            status: 1,
            order: 3, 
            subTasks: [
              { id: 1, title: 'Implement autocomplete functionality', completed: false },
              { id: 2, title: 'Style search results display', completed: false }
            ]
          },
          {
            id: 6,
            title: 'Build setting UI',
            description: 'Create settings page layout',
            status: 1,
            order: 4, 
            subTasks: [
              { id: 1, title: 'Design user preferences section', completed: false },
              { id: 2, title: 'Implement save settings functionality', completed: false }
            ]
          },
          {
            id: 7,
            title: 'Add search endpoints',
            description: 'Define search API routes',
            status: 2,
            order: 2, 
            subTasks: [
              { id: 1, title: 'Implement search query handling', completed: false },
              { id: 2, title: 'Integrate search functionality with database', completed: true }
            ]
          },
          {
            id: 8,
            title: 'Competitor Analysis',
            description: 'Gather competitor data',
            status: 3,
            order: 2, 
            subTasks: [
              { id: 1, title: 'Analyze competitor strategies', completed: false },
              { id: 2, title: 'Compile findings into a report', completed: true }
            ]
          },
        ],
      }, //board Platform Launch
      {
        id: 2,
        name: "Marketing Plan",
        columns: [
          { id: 1, title: 'TODO', order: 1, iconColor: 'blue', },
          { id: 2, title: 'DOING', order: 2, iconColor: 'purple', },
          { id: 3, title: 'DONE', order: 3, iconColor: 'green', },
        ],
        tasks: [
          {
            id: 1,
            title: 'Build UI for onboarding flow',
            description: 'Create login page with email and password fields',
            status: 1,
            order: 1, 
            subTasks: []
          },
          {
            id: 2,
            title: 'Design landing page',
            description: 'Create mockups for landing page layout',
            status: 1,
            order: 2, 
            subTasks: [
              { id: 1, title: 'Design hero section', completed: false },
              { id: 2, title: 'Create call-to-action button', completed: false }
            ]
          },
          {
            id: 3,
            title: 'Develop API endpoints',
            description: 'Implement RESTful API for data retrieval',
            status: 2,
            order: 1, 
            subTasks: [
              { id: 1, title: 'Define API routes', completed: false },
              { id: 2, title: 'Implement authentication middleware', completed: true }
            ]
          },
          {
            id: 4,
            title: 'Refactor codebase',
            description: 'Cleanup code and improve code quality',
            status: 3,
            order: 1, 
            subTasks: []
          },
        ]

      }, //board Marketing Plan
      {
        id: 3,
        name: "Roadmap",
        columns: [
          { id: 1, title: 'TODO', order: 1, iconColor: 'blue', },
          { id: 2, title: 'DOING', order: 2, iconColor: 'purple', },
          { id: 3, title: 'DONE', order: 3, iconColor: 'green', },
        ],
        tasks: [
          {
            id: 1,
            title: 'Build UI for onboarding flow',
            description: 'Create login page with email and password fields',
            status: 1,
            order: 1, 
            subTasks: []
          },
          {
            id: 2,
            title: 'Design landing page',
            description: 'Create mockups for landing page layout',
            status: 1,
            order: 2, 
            subTasks: [
              { id: 1, title: 'Design hero section', completed: false },
              { id: 2, title: 'Create call-to-action button', completed: false }
            ]
          },
          {
            id: 3,
            title: 'Develop API endpoints',
            description: 'Implement RESTful API for data retrieval',
            status: 2,
            order: 1, 
            subTasks: [
              { id: 1, title: 'Define API routes', completed: false },
              { id: 2, title: 'Implement authentication middleware', completed: true }
            ]
          },
          {
            id: 4,
            title: 'Refactor codebase',
            description: 'Cleanup code and improve code quality',
            status: 3,
            order: 1, 
            subTasks: []
          },
        ]

      } //board Roadmap

    ]
  };

  isDarkTheme: boolean = false;
  drawer_opened: boolean = true;

  constructor( private store: Store<AppStateInterface>) {
    const kanbanBoardString = localStorage.getItem('kanbanDB');
    if (kanbanBoardString) {
      this.kanbanBoard = JSON.parse(kanbanBoardString);
    } else {
      localStorage.setItem('kanbanDB', JSON.stringify(this.kanbanBoard));
    }
  }

  getThemeMode(isDarkTheme: boolean) {
    this.isDarkTheme = isDarkTheme;
  }

  hideSidebar(isHidden: boolean){
    this.drawer_opened = isHidden;
  }

  displaySidebar(isDisplayed: boolean){
    this.drawer_opened = isDisplayed;
  }

}
