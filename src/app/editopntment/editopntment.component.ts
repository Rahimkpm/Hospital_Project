import { Component, inject, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { hospital } from '../Models/hospital.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from '../environment.prod';

@Component({
  selector: 'app-editopntment',
  imports: [FormsModule, CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './editopntment.component.html',
  styleUrl: './editopntment.component.css'
})

export class editopnmentComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute,private fb: FormBuilder) { }
  private baseurl: any =   environment.apiBaseUrl;
  hospitals: any[] = [];
  doctors: any[] = [];
  appointmentId=0;
  form!: FormGroup;
  selectedHospitalId: number | null = null; 


  services = inject(ServicesService);
  auth=inject(AuthService);
hid=this.auth.gethospitalId();
  did=this.auth.getDoctorId();

  ngOnInit(): void {
    this.GetHospitals();
    this.appointmentId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    //this.form.patchValue({ isDone: "true" });

this.form = this.fb.group({
      appointmentId: [0],
      patientId: [0],
      patientName: ['', Validators.required],
     // patientAddress: [''],
      patientPhoneNumber: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      reason: ['', Validators.required],
      isDone:["false"],
      doctorId: ['', Validators.required],
      hospitalId: ['', Validators.required],
      doctorNotes: ['temparature:        Blood Pressure:       Heart Rate:        Symptoms:        Diagnosis:             Prescription:          Follow-up:', Validators.required]
                
    });

    if (this.appointmentId > 0) {
      this.loadEditData();

    }
  }



  save(){
    if (this.form.invalid) return;
debugger;
    this.services.save(this.form.value,this.appointmentId).subscribe(() => {
      alert('Saved successfully');
      this.router.navigate(['/appointments/hospital/' + this.hid + '/doctor/' + this.did]);
      debugger;
      console.log('Saved successfully', this.form.value);  
    });
  }

loadEditData() {
    this.services.getById(this.appointmentId).subscribe(res => {
    //    // 🔍 1. See full API response
    // console.log('API Response data to  form:', res);

    // // 🔍 2. See form values BEFORE patch
    // console.log('Form BEFORE patch:', this.form.value);
       this.form.patchValue(res);
      this.form.patchValue({ 
  //     appointmentId: res.apid,
  // patientId: res.patient.id,
  // patientName: res.reason,
  // patientAddress: res.patient.Address,   // ✅ FIXED
  // patientPhoneNumber: res.patient.phonenumber,
  // appointmentDate: res.appointmentDate,
  // reason: res.reason,
  isDone: "true",
  // doctorId: res.doctorId,
  // hospitalId: res.hospitalId,
  // doctorNotes: res.doctorNotes
 });

       // 🔍 3. See form values AFTER patch
    // console.log('Form AFTER patch:', this.form.value);
    });
  }
  


  GetHospitals() {
    // this.services.loadHospitals().subscribe({next:res=>{this.hospitals=res},error:(err)=>{}})

    this.services.loadHospitals().subscribe(res => this.hospitals = res);
    debugger;
    console.log('hospitaldata', this.hospitals);
    debugger;

  }

   onHospitalChange() {

   
    debugger;
    this.doctors = [];
    // this.appintmentobj.doctorId = null;
    // if (!this.appintmentobj.hospitalId) return;
debugger;
    this.http.get<any[]>(
      `${this.baseurl}/doctors/by-hospital/${this.selectedHospitalId}`
    ).subscribe(res => this.doctors = res);
    debugger;
  }







}


