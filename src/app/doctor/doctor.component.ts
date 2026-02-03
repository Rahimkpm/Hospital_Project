import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { HospitalService } from '../hospital.service';
import { hospital } from '../Models/hospital.model';
import { doctor } from '../Models/doctor.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  imports: [CommonModule,ReactiveFormsModule]
})
export class DoctorComponent implements OnInit {

  doctorForm!: FormGroup;
  doctors: doctor[] = [];
  hospitals: hospital[] = [];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private hospitalService: HospitalService, private router:Router 
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadDoctors();
    this.loadHospitals();
  }

  createForm() {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialty: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      hospitalId: ['', Validators.required]
    });
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(res => {
      this.doctors = res;
    });
  }

  loadHospitals() {
    this.hospitalService.getHospitals().subscribe(res => {
      this.hospitals = res;
    });
  }

  openModal() {
    this.doctorForm.reset();
  }

  submit() {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    const doctor: doctor = {
      id: 0,
      ...this.doctorForm.value
    };

    this.doctorService.addDoctor(doctor).subscribe({
      next: () => {
        this.loadDoctors();
        alert('Doctor added successfully');
        this.router.navigate(['/userregister']).then(()=>{window.location.reload()});
        document.getElementById('closeDoctorModal')?.click();
      },
      error:()  =>{
        alert('Doctor all ready added, check once ');
      } 
    });
  }
}
