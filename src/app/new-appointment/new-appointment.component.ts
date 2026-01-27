import { Component, inject, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { FormsModule } from '@angular/forms';
import { hospital } from '../Models/hospital.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../toast.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-appointment',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.css'
})

export class NewAppointmentComponent implements OnInit {
  constructor(private http: HttpClient,private router:Router) { }
 
  private baseurl: any = 'https://localhost:5219/api'
  hospitals: any[] = [];
  doctors: any[] = [];
patients:any[]=[];
  services = inject(ServicesService);
  
  toast=inject(ToastService);
  auth=inject(AuthService);

  ngOnInit(): void {
    this.GetHospitals();
    var hid=this.auth.gethospitalId();
    var did=this.auth.getDoctorId();
    
  }
patientojb:any={
  id:0,
  name:'',
  address:'',
  phonenumber:''
}

  appintmentobj: any = {
    apid: 0,
    patientid: 0,
    patientName: '',
    patientAddress: '',
    patientPhoneNumber: '',
    appointmentDate: '',
    reason: '',
      isDone:'false',
    doctorId: 0,
    hospitalId: 0,
    doctorNotes:'temparature:        Blood Pressure:       Heart Rate:        Symptoms:        Diagnosis:             Prescription:          Follow-up:'
    
    

  }

//   onSubmit() {
//   alert('Submit clicked');
//   console.log('Submit clicked');
// }


saveappointment(){
   // if (this.form.invalid) return;
debugger;
    this.services.save(this.appintmentobj,this.appintmentobj.apid).subscribe({
      next: (res) => {
        alert('Appointment created successfully');
        this.router.navigate(['/appointments']);
        this.toast.success('Appointment booked successfully','tiltle');
        this.appintmentobj = {
          apid: 0,
          patientid: 0,
          patientName: '',
          patientAddress: '',
          patientPhoneNumber: '',
          appointmentDate: '',
          reason: '',
            isDone:'false',
          doctorId: 0,
          hospitalId: 0,
          doctorNotes:'temparature:        Blood Pressure:       Heart Rate:        Symptoms:        Diagnosis:             Prescription:          Follow-up:'
        };

        debugger
        console.log('Appointment created successfully object', res);
        
      },
      error: (err) => {
        debugger;
        console.error('Error creating appointment', err);
      }
    })
  }


  onSubmit() {
     console.log('Payload being sent:', this.appintmentobj);
    this.services.createAppointment(this.appintmentobj).subscribe({
      next: (res) => {
        alert('Appointment created successfully');
        this.toast.success('Appointment booked successfully');
        debugger
        console.log('Appointment created successfully object', res);
        
      },
      error: (err) => {
        debugger;
        console.error('Error creating appointment', err);
      }
    })

     }

      save(form:any){
    //if (this.form.invalid) return;
    // if(form.invalid) 
    // {
debugger;
    this.services.save(this.appintmentobj,this.appintmentobj.apid).subscribe(() => {
      alert('Saved successfully');
      debugger;
      //console.log('Saved successfully', this.form.value);  
    });
  // }
  }

GetPatientDetailsByMobile() {
  this.services
    .GetPatientDetailsByMobile(this.appintmentobj.patientPhoneNumber)
    .subscribe(res => {
debugger;
console.log('Patient details received:', res);
      // If API returns single object
      this.appintmentobj.patientName = res.patientName;
      this.appintmentobj.patientPhoneNumber = res.patientPhoneNumber;
      this.appintmentobj.reason = res.reason;
      this.appintmentobj.patientAddress = res.patientAddress;

debugger;
    }, error => {
      console.error('Error fetching patient details', error  );
}
    )};

  GetHospitals() {
    // this.services.loadHospitals().subscribe({next:res=>{this.hospitals=res},error:(err)=>{}})

    this.services.loadHospitals().subscribe(res => this.hospitals = res);
    debugger;
    console.log('hospitaldata', this.hospitals);
    debugger;

  }

  onHospitalChange() {
    this.doctors = [];
    this.appintmentobj.doctorId = null;


    if (!this.appintmentobj.hospitalId) return;

    this.http.get<any[]>(
      `${this.baseurl}/doctors/by-hospital/${this.appintmentobj.hospitalId}`
    ).subscribe(res => this.doctors = res);
  }







}


