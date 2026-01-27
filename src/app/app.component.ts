import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { SpinnerComponent } from './spinner/spinner.component';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule,SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'HospitalProject';
 HospitalName:any;

  auth = inject(AuthService );
constructor(){} 
 
 ngOnInit(): void {
   this.HospitalName = this.auth.getFullname();
 }

isSidebarOpen = false;

 toggleSidebar() {
    console.log('Hamburger clicked', this.isSidebarOpen);
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }


}
