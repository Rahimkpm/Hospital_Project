import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hospital } from './Models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor( private http: HttpClient) { }
 private baseurl:any='https://localhost:5219/api'
  createAppointment(obj: any) {
    // Logic to send appointmentData to the backend API
    return this.http.post('https://localhost:5219/api/appointments', obj);
    debugger;
    console.log('Appointment Data:', obj);
  }
   
  loadHospitals() {
    // this.http.get<any[]>(`${this.baseurl}/hospitals`)
    //   .subscribe(res => this.hospitals = res);
      return this.http.get<any[]>('https://localhost:5219/api/hospitals');
      debugger;
      console.log('load hospitals called');
      
  }


  GetPatientDetailsByMobile(mobile:string){
    return this.http.get<any>(`${this.baseurl}/patients/by-mobile/${mobile}`);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.baseurl}/Appointments/${id}`);
  }

  save(data: any,id:number) {
  return this.http.post(
    `https://localhost:5219/api/Appointments/${id}`,
    data
  );
}

}
