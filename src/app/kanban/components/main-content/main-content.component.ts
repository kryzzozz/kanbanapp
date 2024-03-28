import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  kanbanBoard = {
    boards: [
      {
        id: 1,
        name: "Platform Launch",
        columns: [
          {
            id: 1,
            title: 'TODO',
            order: 1, 
            iconColor: 'blue',
            tasks: [
              {
                id: 1,
                title: 'Build UI for onboarding flow',
                description: 'Create login page with email and password fields',
                status: 'TODO',
                order: 1, 
                subTasks: []
              },
              {
                id: 2,
                title: 'Design landing page',
                description: 'Create mockups for landing page layout',
                status: 'TODO',
                order: 2, 
                subTasks: [
                  { id: 1, title: 'Design hero section', completed: false },
                  { id: 2, title: 'Create call-to-action button', completed: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: 'DOING',
            order: 2, 
            iconColor: 'purple',
            tasks: [
              {
                id: 3,
                title: 'Develop API endpoints',
                description: 'Implement RESTful API for data retrieval',
                status: 'DOING',
                order: 1, 
                subTasks: [
                  { id: 1, title: 'Define API routes', completed: false },
                  { id: 2, title: 'Implement authentication middleware', completed: true }
                ]
              }
            ]
          },
          {
            id: 3,
            title: 'DONE',
            order: 3, 
            colorIconId: 3,
            iconColor: 'green',
            tasks: [
              {
                id: 4,
                title: 'Refactor codebase',
                description: 'Cleanup code and improve code quality',
                status: 'DONE',
                order: 1, 
                subTasks: []
              }
            ]
          }
        ]
      }, //board Platform Launch
      {
        id: 2,
        name: "Marketing Plan",
        columns: [
          {
            id: 1,
            title: 'TODO',
            order: 1, 
            iconColor: 'blue',
            tasks: [
              {
                id: 1,
                title: 'Build UI for onboarding flow',
                description: 'Create login page with email and password fields',
                status: 'TODO',
                order: 1, 
                subTasks: []
              },
              {
                id: 2,
                title: 'Design landing page',
                description: 'Create mockups for landing page layout',
                status: 'TODO',
                order: 2, 
                subTasks: [
                  { id: 1, title: 'Design hero section', completed: false },
                  { id: 2, title: 'Create call-to-action button', completed: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: 'DOING',
            order: 2, 
            iconColor: 'purple',
            tasks: [
              {
                id: 3,
                title: 'Develop API endpoints',
                description: 'Implement RESTful API for data retrieval',
                status: 'DOING',
                order: 1, 
                subTasks: [
                  { id: 1, title: 'Define API routes', completed: false },
                  { id: 2, title: 'Implement authentication middleware', completed: true }
                ]
              }
            ]
          },
          {
            id: 3,
            title: 'DONE',
            order: 3, 
            colorIconId: 3,
            iconColor: 'green',
            tasks: [
              {
                id: 4,
                title: 'Refactor codebase',
                description: 'Cleanup code and improve code quality',
                status: 'DONE',
                order: 1, 
                subTasks: []
              }
            ]
          }
        ]
      } //board Marketing Plan

    ]
  };

  columns: any[] = [];

  constructor() {}

  ngOnInit(): void {

    const kanbanBoardString = localStorage.getItem('kanbanDB');
    if (kanbanBoardString) {
      this.kanbanBoard = JSON.parse(kanbanBoardString);
    } else {
      localStorage.setItem('kanbanDB', JSON.stringify(this.kanbanBoard));
    }

    this.columns = this.kanbanBoard.boards[0].columns;
  }


}
