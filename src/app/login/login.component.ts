import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 auth=inject(AuthService);
  constructor( private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }
  

  form!: FormGroup;
  hid=this.auth.gethospitalId();
  did=this.auth.getDoctorId();

  ngOnInit(): void {


    this.form = this.fb.group({

      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.auth.login(this.form.value).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        debugger
        this.auth.saveUser(res);
        debugger;
        if (res.role === 'Admin') {
          this.router.navigate(['/admindashboard']);

          //this.router.navigate(['/appointmentscards']);
        } else if (res.role === 'Doctor') {
          //this.router.navigate(['/doctordashboard']);
          
           this.router.navigate(['/appointments/hospital/' + this.hid + '/doctor/' + this.did]).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/patientdashboard']);
        }
      }
    });
  }


}