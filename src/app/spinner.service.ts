// spinner.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private loadingCount = signal(0);

  isLoading = () => this.loadingCount() > 0;

  show() {
    this.loadingCount.update(v => v + 1);
  }

  hide() {
    this.loadingCount.update(v => Math.max(0, v - 1));
  }
}
