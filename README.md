# Kanban Task Management App 🚀

A Kanban-style task management application built with **Angular 21** and **Modern Web Standards**. This project demonstrates a scalable, reactive, and performance-oriented architecture using the latest features of the Angular ecosystem.

![Kanban Preview](./screenshots/preview.png) ## 🌟 Key Features

* **Reactive State Management:** Implemented with **NgRx Signals (SignalStore)** for predictable, immutable state management free of excessive boilerplate.
* **Fluid Drag & Drop:** Integration with `@angular/cdk/drag-drop` for reordering tasks between columns with state persistence.
* **Subtask Management:** Capability to create, view, and mark subtasks as completed with immediate visual updates.
* **Dynamic Theming:** Light/Dark Mode system based on **CSS Variables** and automatic system preference detection.
* **Data Persistence:** Automatic synchronization with `localStorage` using Angular `effects`.
* **Clean Architecture:** Strict separation between presentation (Dumb) components and logical containers (Smart/Pages).

## 🛠️ Tech Stack & Technical Decisions

The project was designed with long-term maintainability and scalability in mind.

| Technology | Decision / Rationale |
| :--- | :--- |
| **Angular 21+** | Utilization of **Standalone Components**, **Signals** for granular reactivity, and **Control Flow** (`@if`, `@for`) for cleaner templates. |
| **NgRx Signals** | Chosen over classic NgRx (Redux) for its simplicity, reduced boilerplate, and seamless integration with Angular Signals. |
| **Jest** | Unit testing framework configured to replace Karma, offering faster execution (JSDOM) and a superior developer experience. |
| **TypeScript** | Strict typing (`strict: true`) enabled to ensure code robustness and type safety. |
| **SCSS / CSS Vars** | Modular style architecture. Native CSS variables used for real-time theme switching without expensive repaints. |

## 🚀 Getting Started

### Prerequisites
* Node.js (v20 or higher recommended)
* NPM

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/kanban-pro.git](https://github.com/your-username/kanban-pro.git)
    ```
2.  Install dependencies:
    ```bash
    cd kanban-pro
    npm install
    ```

### Development Server

Run the development server to view the app in action:

```bash
npm start
# Or alternatively:
ng serve