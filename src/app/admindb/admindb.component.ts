import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { environment } from '../environment';

@Component({
  standalone: true,
  selector: 'app-admindb',
  imports: [CommonModule],
  templateUrl: './admindb.component.html'
})
export class AdmindbComponent implements OnInit, AfterViewInit {

  baseUrl = environment.apiBaseUrl;

  summary: any = {};
  hospitalChart!: Chart;
  statusChart!: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSummary();
    this.loadHospitalChart();
  }

  ngAfterViewInit(): void {
    this.initStatusChart();
  }

  loadSummary() {
    this.http.get<any>(`${this.baseUrl}/Appointments/summary`)
      .subscribe(res => {
        this.summary = res;
        this.updateStatusChart();
      });
  }

  initStatusChart() {
    this.statusChart = new Chart('statusChart', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{ data: [0, 0] }]
      }
    });
  }

  updateStatusChart() {
    if (!this.statusChart) return;
    this.statusChart.data.datasets[0].data = [
      this.summary.completed,
      this.summary.pending
    ];
    this.statusChart.update();
  }

  loadHospitalChart() {
    this.http.get<any[]>(`${this.baseUrl}/Appointments/appointments-by-hospital`)
      .subscribe(res => {
        this.hospitalChart = new Chart('hospitalChart', {
          type: 'bar',
          data: {
            labels: res.map(x => x.hospital),
            datasets: [{
              label: 'Appointments',
              data: res.map(x => x.count)
            }]
          }
        });
      });
  }
}
