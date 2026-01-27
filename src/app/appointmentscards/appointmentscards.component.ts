import { Component, inject, OnInit } from '@angular/core';
import { Appointmentview } from '../Models/appointmentview.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Appointment } from '../Models/appointment.model';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-appointmentscards',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './appointmentscards.component.html',
  styleUrl: './appointmentscards.component.css'
})
export class AppointmentscardsComponent implements OnInit {
  hospitalSearchForm!: FormGroup;
  appointmentview: Appointmentview[] = [];

  token: any = localStorage.getItem('token');

  headers: any = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  baseUrl = 'https://localhost:5219/api';

  auth = inject(AuthService);

  hospitalId!: any;
  doctorId!: any;
  role!: any;
  TodayDate!: string;
  activeTab = 'all';
  searchText='';


  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  filteredHospitals = [...this.appointmentview];

  ngOnInit(): void {

    debugger;
    this.searchText = localStorage.getItem('appointmentsearch')||'rahim';
    console.log('SSSSSSSSSTTTT', this.searchText);
    //   this.hospitalSearchForm.get('searchText')?.valueChanges
    // .subscribe(val => {
    //   //this.loadDoctors(val); // API call
    //   this.loadAppointments(this.activeTab,this.selectText);
    // });


    this.TodayDate = new Date().toISOString().split('T')[0];
    this.hospitalId = this.auth.gethospitalId();
    this.doctorId = this.auth.getDoctorId();
    this.role = this.auth.getRole();
    console.log('role', this.role);
    console.log('Hospital ID:', this.hospitalId);
    console.log('Doctor ID:', this.doctorId);

    if (this.hospitalId && this.doctorId) {
      //this.getAppointments(this.hospitalId, this.doctorId,this.datePipe.transform(this.TodayDate, 'yyyy-MM-dd')!);
      //this.getAppointments(this.hospitalId, this.doctorId);
      this.loadAppointments(this.activeTab, this.searchText);
    }

this.hospitalSearchForm = this.fb.group({
      searchTextbox: ['']
    });


  }

//   texboxonblur():void {
   
// debugger;
  
// debugger;
//     this.hospitalSearchForm.get('searchTextbox')?.valueChanges
//       .subscribe(value => {
//         this.searchText = value ?? '';
//         debugger;
//       });

//     console.log('Search Textbox Value:', this.searchText);
//     localStorage.setItem('appointmentsearch', this.searchText);
//     debugger;
//     window.location.reload();
//   }



textboxonblur(): void {

  const value =
    this.hospitalSearchForm.get('searchTextbox')?.value ?? '';

  this.searchText = value;

  console.log('Search Textbox Value:', this.searchText);

  // Save to localStorage
  localStorage.setItem('appointmentsearch', this.searchText);

  // OPTIONAL: reload only if really needed
   window.location.reload();
}





  loadAppointments(type: string, searchText?: string) {
    this.activeTab = type;
    this.getAppointments(this.hospitalId, this.doctorId, type, this.searchText ?? 'y888');
    //window.location.reload();
  }

  get allCount() {
    return this.appointmentview.length;

  }

  get doneCount() {
    return this.appointmentview.filter(a => a.isDone == "true").length;
  }

  get notDoneCount() {
    return this.appointmentview.filter(a => a.isDone == "false").length;
  }




  getAppointments(hospitalId: number, doctorId: number, type: string, searchText: string = 'y888'): void {
    this.http
      .get<Appointmentview[]>(
        `${this.baseUrl}/Appointments/hospital/${hospitalId}/doctor/${doctorId}/type/${type}/search/${searchText}`, {
        headers: this.auth.getAuthHeaders()
      }
      )
      .subscribe({
        next: res => {
          if (res != null) {
            debugger;
            console.log('Received Appointments:', res);
            this.appointmentview = res;

          } else {

            alert('No appointments found.');
          }
          debugger;
          console.log('Appointments:', res);
          debugger;
        },
        error: err => {
          console.error('API Error:', err)


          alert('Subscription expired. Please contact admin.');
          this.router.navigate(['/paidsubscription']);
          debugger;

        }

      });
  }


  // Optional: Mark appointment done
  // markDone(id: number): void {
  //   this.http
  //     .put(`${this.baseUrl}/Appointments/${id}/mark-done`, {})
  //     .subscribe(() => {
  //       this.getAppointments(this.hospitalId, this.doctorId);
  //     });
  // }

}
