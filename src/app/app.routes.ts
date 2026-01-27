import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

import { PatientsComponent } from './patients/patients.component';
import { appConfig } from './app.config';


import { editopnmentComponent } from './editopntment/editopntment.component';
import { AppointmentscardsComponent } from './appointmentscards/appointmentscards.component';
import { HistoryoppointsComponent } from './historyoppoints/historyoppoints.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

import { authGuard } from './auth.guard';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { DoctordashboardComponent } from './doctordashboard/doctordashboard.component';
import { SubscribtionComponent } from './subscribtion/subscribtion.component';
import { PaidsubscriptionComponent } from './paidsubscription/paidsubscription.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdmindbComponent } from './admindb/admindb.component';







export const routes: Routes = [
    {
        path: "",
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'NewAppointment',
        component: NewAppointmentComponent
    },
    {
        path: 'Patients',
        component: PatientsComponent
    },

    {
        path: 'editopntment/:id',
        component: editopnmentComponent
    },

    {
        path: 'appointments/hospital/:hospitalid/doctor/:doctorid',
        component: AppointmentscardsComponent
    },
    {
        path: 'historyoppoints/:id/details',
        component: HistoryoppointsComponent
    },
    {
        path: 'admindashboard',
        component: AdmindashboardComponent,
       
    },
    {
        path: 'doctordashboard',
        component: DoctordashboardComponent,
        canActivate: [authGuard],
        data: { role: 'Doctor' },

    },
    {
        path: 'patientdashboard',
        component: PatientdashboardComponent,
        canActivate: [authGuard],
        data: { role: 'Patient' }
    },
    {
        path: 'subscribtion',
        component: SubscribtionComponent,
        canActivate: [authGuard],
        data: { role: 'Doctor' },

    },
    {
        path: 'paidsubscription',
        component: PaidsubscriptionComponent,
        canActivate: [authGuard],
        data: { role: 'Doctor' },
    },
    {
        path: 'userregister',
        component: UserregisterComponent,
    },
    {
        path: 'hospitalregister',
        component: HospitalComponent

    },
    {
        path:'doctorregister',
        component:DoctorComponent
    },
    {
        path:'admindb',
        component:AdmindbComponent
    }
    




];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
