import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-historyoppoints',
  imports: [CommonModule,RouterLink],
  templateUrl: './historyoppoints.component.html',
  styleUrl: './historyoppoints.component.css'
})
export class HistoryoppointsComponent {

appointment: any;
  history: any[] = [];
  baseUrl = 'https://localhost:5219/api/appointments';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<any>(`${this.baseUrl}/${id}/details`)
      .subscribe(res => {
        this.appointment = res.appointment;
        this.history = res.previousHistory;
      });
  }

}
