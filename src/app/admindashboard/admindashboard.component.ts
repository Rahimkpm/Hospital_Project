import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admindashboard.component.html',
  imports: [ CommonModule , DatePipe],
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  users: any[] = [];
  hospitals: any[] = [];
  doctors: any[] = [];
  appointments: any[] = [];
  subscriptions: any[] = [];

  api = 'https://localhost:5219/api/admin';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.http.get<any[]>(`${this.api}/users`).subscribe(r => this.users = r);
    this.http.get<any[]>(`${this.api}/hospitals`).subscribe(r => this.hospitals = r);
    this.http.get<any[]>(`${this.api}/doctors`).subscribe(r => this.doctors = r);
    this.http.get<any[]>(`${this.api}/appointments`).subscribe(r => this.appointments = r);
    this.http.get<any[]>(`${this.api}/subscriptions`).subscribe(r => this.subscriptions = r);
  }

  toggleUser(id: number) {
    this.http.put(`${this.api}/user/status/${id}`, {})
      .subscribe(() => this.loadAll());
  }
}
