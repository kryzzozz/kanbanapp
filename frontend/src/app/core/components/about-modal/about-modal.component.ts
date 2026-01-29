// src/app/core/components/about-modal/about-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <header class="modal-header">
          <h2>🚀 Architecture Overview</h2>
          <button class="close-btn" (click)="close()">&times;</button>
        </header>
        
        <div class="modal-body">
          <p class="intro">
            Welcome to <strong>Kanban Pro</strong>. This application is a full-stack demonstration 
            of modern web architecture, designed and developed by <strong>Christian Osuna</strong>.
          </p>

          <div class="tech-grid">
            <div class="tech-item">
              <h3>🎨 Frontend</h3>
              <ul>
                <li><strong>Framework:</strong> Angular 18+ (Standalone)</li>
                <li><strong>State:</strong> Angular Signals (Reactive)</li>
                <li><strong>UX:</strong> Drag & Drop (Angular CDK)</li>
                <li><strong>Hosting:</strong> Vercel (CI/CD)</li>
              </ul>
            </div>

            <div class="tech-item">
              <h3>⚙️ Backend</h3>
              <ul>
                <li><strong>API:</strong> .NET 8 WebAPI (C#)</li>
                <li><strong>Architecture:</strong> Clean Architecture</li>
                <li><strong>OS:</strong> Linux Environment</li>
                <li><strong>Hosting:</strong> Azure App Service</li>
              </ul>
            </div>

            <div class="tech-item">
              <h3>💾 Data & Infra</h3>
              <ul>
                <li><strong>DB:</strong> MongoDB Atlas (NoSQL Cloud)</li>
                <li><strong>Auth:</strong> Secure Connection Strings</li>
                <li><strong>Repo:</strong> GitHub Monorepo</li>
              </ul>
            </div>
          </div>

          <div class="footer-links">
            <p>Check the code on:</p>
            <a href="https://github.com/kryzzozz/kanbanapp" target="_blank" class="github-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.32-1.755-1.32-1.755-1.095-.75.075-.735.075-.735 1.215.09 1.845 1.245 1.845 1.245 1.065 1.83 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.545 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.75);
      display: flex; justify-content: center; align-items: center;
      z-index: 9999; backdrop-filter: blur(4px);
    }
    .modal-content {
      background: var(--color-bg); color: var(--color-text);
      padding: 2rem; border-radius: 12px;
      width: 90%; max-width: 650px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      border: 1px solid var(--color-border);
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; }
    .modal-header h2 { margin: 0; color: #635fc7; font-size: 1.5rem; }
    .close-btn { background: none; border: none; font-size: 2rem; color: var(--color-text-secondary); cursor: pointer; line-height: 1; }
    .intro { margin-bottom: 2rem; color: var(--color-text-secondary); line-height: 1.6; font-size: 1.1rem; }
    .tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
    .tech-item h3 { color: var(--color-text); font-size: 1rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 8px; }
    .tech-item ul { list-style: none; padding: 0; margin: 0; }
    .tech-item li { font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 0.5rem; display: flex; flex-direction: column; }
    .tech-item li strong { color: var(--color-text); font-weight: 600; font-size: 0.8rem; opacity: 0.8; }
    .footer-links { text-align: center; border-top: 1px solid var(--color-border); padding-top: 1.5rem; }
    .footer-links p { margin-bottom: 1rem; color: var(--color-text-secondary); font-size: 0.9rem; }
    .github-btn {
      display: inline-flex; align-items: center; background: #24292e; color: white;
      padding: 0.8rem 2rem; border-radius: 50px; text-decoration: none; font-weight: bold;
      transition: all 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    .github-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.3); background: #2f363d; }
  `]
})
export class AboutModalComponent {
  @Output() closeEvent = new EventEmitter<void>();
  close() { this.closeEvent.emit(); }
}