// spinner.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../spinner.service';


@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" *ngIf="spinner.isLoading()">
      <div class="loader"></div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.3);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .loader {
      width: 50px;
      height: 50px;
      border: 5px solid #ddd;
      border-top: 5px solid #1976d2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent {
  constructor(public spinner: SpinnerService) {}
  
}
