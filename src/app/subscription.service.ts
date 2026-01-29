import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {

  private apiUrl = environment.apiBaseUrl + '/subscriptions';

  constructor(private http: HttpClient) {}

  createSubscription(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getUserSubscriptions(userId: number) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}
