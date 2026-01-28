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
    next: (res: any) => {
      // success response
      localStorage.setItem('token', res.token);
      this.auth.saveUser(res);

      if (res.role === 'Admin') {
        this.router.navigate(['/admindashboard']);
      } 
      else if (res.role === 'Doctor') {
        this.router
          .navigate(['/appointments/hospital/' + this.hid + '/doctor/' + this.did])
          .then(() => window.location.reload());
      } 
      else {
        this.router.navigate(['/patientdashboard']);
      }
    },

    error: (err) => {
      // ❌ invalid email or password
      alert('Invalid Credentials');
    }
  });
}



}