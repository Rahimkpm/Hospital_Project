import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiBaseUrl + '/Auth';


  login(data: any) {
    debugger;
    return this.http.post<any>(`${this.baseUrl}/login`, data);
    localStorage.setItem('token', data.token);
    console.log('LOGINDATA:', data);
  }

  saveUser(res: any) {
    debugger;
    console.log('SAVEDDATA:', res);
    debugger;
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('fullname', res.fullName);
    localStorage.setItem('email', res.email);
    debugger;
    localStorage.setItem('doctorId', res.doctorid);


    console.log('doctoridval', res.doctorid);
    debugger;
    localStorage.setItem('hospitalId', res.hospitalid);
    localStorage.setItem('userId', res.id);
  }

  getRole() {

    return localStorage.getItem('role');

  }
  getFullname() {
    return localStorage.getItem('fullname');
  }
  getUserId() {
    return localStorage.getItem('userId');
  }
  getDoctorId(): number {
    debugger;
    //return localStorage.getItem('doctorId');
    const id = localStorage.getItem('doctorId');
    return id !== null && !isNaN(Number(id)) ? Number(id) : 0;
    debugger;
    console.log('Doctor ID:', localStorage.getItem('doctorId'));

    debugger;
  }
  gethospitalId(): number {
    //return localStorage.getItem('hospitalId');
    debugger;
    const id = localStorage.getItem('hospitalId');
    return id !== null && !isNaN(Number(id)) ? Number(id) : 0;
    debugger;
    console.log('HOSPITALID', id);
    debugger;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }



getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');

  return new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
}


}
