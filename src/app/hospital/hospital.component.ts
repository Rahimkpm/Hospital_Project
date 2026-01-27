import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HospitalService } from '../hospital.service';
import { hospital } from '../Models/hospital.model';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  imports:[CommonModule,ReactiveFormsModule]
})
export class HospitalComponent implements OnInit {

  hospitalForm!: FormGroup;
  hospitals: hospital[] = [];

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,private router:Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadHospitals();
  }

  createForm() {
    this.hospitalForm = this.fb.group({
      hospitalName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]]
    });
  }

  loadHospitals() {
    this.hospitalService.getHospitals().subscribe({
      next: (res) => this.hospitals = res,
      error: (err) => console.error(err)
    });
  }

  openModal() {
    this.hospitalForm.reset();
  }

  submit() {
    if (this.hospitalForm.invalid) {
      this.hospitalForm.markAllAsTouched();
      alert('Hospital added successfully');
      this.router.navigate(['/userregister']);
      return;
    }

    const hospital: hospital = {
      id: 0,
      ...this.hospitalForm.value
    };

    this.hospitalService.addHospital(hospital).subscribe({
      next: () => {

        this.loadHospitals();
         alert('Hospital added successfully');
        this.router.navigate(['/userregister11']);
        document.getElementById('closeModal')?.click();
        
      },
      error: (err) => console.error(err)
    });
  }
}
