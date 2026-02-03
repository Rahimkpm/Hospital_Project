import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserserviceService } from '../userservice.service';
import { hospital } from '../Models/hospital.model';
import { doctor } from '../Models/doctor.model';
import { CommonModule } from '@angular/common';
import { routes } from '../app.routes';
import { Router, RouterLink } from '@angular/router';
import { HospitalComponent } from "../hospital/hospital.component";
import { DoctorComponent } from "../doctor/doctor.component";

@Component({
  selector: 'app-userregister',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HospitalComponent, DoctorComponent],
  templateUrl: './userregister.component.html'
})
export class UserregisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  hospitals: hospital[] = [];
  doctors: doctor[] = [];
  showHospitalModal = false;
  showDoctorModal = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService,private router:Router
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
    this.loadHospitals();
  }

  createForm() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      hospitalid: ['', Validators.required],
      doctorid: ['', Validators.required],
      specialty: [''],
      validitydate: ['']
    });
  }

  refresh(){
    this.loadHospitals();
    window.location.reload();
  }

  loadHospitals() {
    this.userService.getHospitals().subscribe(res => {
      debugger;
      this.hospitals = res;
      console.log('HOSPITALDAT', this.hospitals);
      debugger;
    });
  }



 

  onHospitalChange() {
    
    const hospitalId = this.registerForm.value.hospitalid;
    this.doctors = [];
    this.registerForm.patchValue({ doctorid: '' });

    if (hospitalId) {
      this.userService.getDoctorsByHospital(hospitalId)
        .subscribe(res => {
          this.doctors = res;
        });
    }
  }


openHospitalModal() {
  this.showHospitalModal = true;
  localStorage.setItem('showHospitalModal', 'true');
}

openDoctorModal() {
  this.showDoctorModal = true;
  localStorage.setItem('showDoctorModal', 'true');
}


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      //this.registerForm.markAllAsTouched();
      return;
    }

    this.userService.registerUser(this.registerForm.value)
      .subscribe({
        next: () => {
          debugger;
         // console.log('Registration Response:', res);
          alert('User registered successfully');
          //this.registerForm.reset({ role: 'User' });
        this.router.navigate(['/paidsubscription']);
        },
        error: err => {
          console.error(err);
          alert('Click on Refresh or check either duplication.');
        }
      });
  }
}
