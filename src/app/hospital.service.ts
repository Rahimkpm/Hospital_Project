import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { hospital } from './Models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private apiUrl = 'https://localhost:5219/api/hospitals'; // change as per API

  constructor(private http: HttpClient) {}

  getHospitals(): Observable<hospital[]> {
    return this.http.get<hospital[]>(this.apiUrl);
  }

  addHospital(hospital: hospital): Observable<any> {
    return this.http.post(this.apiUrl, hospital);
  }
}
