import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { environment } from '../environment';

@Component({
  standalone: true,
  selector: 'app-doctor-dashboard',
  imports: [CommonModule],
  templateUrl: './doctordashboard.component.html'
})
export class DoctordashboardComponent implements OnInit {

  baseUrl = environment.apiBaseUrl + '/Doctorsdashboard';
  doctorId = localStorage.getItem('doctorId'); // 🔐 replace with JWT doctorId

  summary: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSummary();
    this.loadStatusChart();
    this.loadWeeklyTrend();
  }

  loadSummary() {
    this.http.get<any>(`${this.baseUrl}/summary/${this.doctorId}`)
      .subscribe(res => this.summary = res);
  }

  loadStatusChart() {
    this.http.get<any>(`${this.baseUrl}/status-chart/${this.doctorId}`)
      .subscribe(res => {
        new Chart('statusChart', {
          type: 'doughnut',
          data: {
            labels: ['Completed', 'Pending'],
            datasets: [{
              data: [res.completed, res.pending]
            }]
          }
        });
      });
  }

  loadWeeklyTrend() {
    this.http.get<any[]>(`${this.baseUrl}/weekly-trend/${this.doctorId}`)
      .subscribe(res => {
        new Chart('weeklyChart', {
          type: 'line',
          data: {
            labels: res.map(x => x.date),
            datasets: [{
              label: 'Appointments',
              data: res.map(x => x.count)
            }]
          }
        });
      });
  }
}
