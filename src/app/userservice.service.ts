import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { hospital } from './Models/hospital.model';
import { doctor } from './Models/doctor.model';
import { userregister } from './Models/userregister.model';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseUrl = environment.apiBaseUrl; // change if needed

//Hospital: hospital[] = [];
  constructor(private http: HttpClient) {}

  getHospitals(): Observable<hospital[]> {
    return this.http.get<hospital[]>(`${this.baseUrl}/Hospitals`);
  }

  getDoctorsByHospital(hospitalId: number): Observable<doctor[]> {
    return this.http.get<doctor[]>(
      `${this.baseUrl}/doctors/by-hospital/${hospitalId}`
    );
  }

  registerUser(data: userregister): Observable<userregister> {
    return this.http.post<userregister>(`${this.baseUrl}/Auth/register`, data);
  }
}
