import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment.prod';

@Injectable({ providedIn: 'root' })
export class PaymentService {

  private apiUrl = environment.apiBaseUrl + '/payments';

  constructor(private http: HttpClient) {}

  createOrder(data: any) {
    return this.http.post(`${this.apiUrl}/create-order`, data);
  }

  verifyPayment(data: any) {
    return this.http.post(`${this.apiUrl}/verify`, data);
  }
}
