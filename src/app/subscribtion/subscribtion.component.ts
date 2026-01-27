import { Component } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-subscribtion',
  imports: [FormsModule,CommonModule],
  templateUrl: './subscribtion.component.html',
  styleUrl: './subscribtion.component.css'
})
export class SubscribtionComponent {
  subscription = {
    userId: Number(localStorage.getItem('userId')),
    planName: 'Premium',
    amount: 999,
    durationInDays: 30
  };

  message = '';

  constructor(private subService: SubscriptionService) {}

  subscribe() {
    this.subService.createSubscription(this.subscription)
      .subscribe({
        next: (res: any) => {
          this.message = res.message;
        },
        error: () => {
          this.message = 'Subscription failed';
        }
      });
  }

}
