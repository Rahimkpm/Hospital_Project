import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {

  private apiUrl = 'https://localhost:5219/api/payments';

  constructor(private http: HttpClient) {}

  createOrder(data: any) {
    return this.http.post(`${this.apiUrl}/create-order`, data);
  }

  verifyPayment(data: any) {
    return this.http.post(`${this.apiUrl}/verify`, data);
  }
}
