import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { doctor } from './Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'https://localhost:5219/api/doctors';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<doctor[]> {
    return this.http.get<doctor[]>(this.apiUrl);
  }

  addDoctor(doctor: doctor): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }
}
