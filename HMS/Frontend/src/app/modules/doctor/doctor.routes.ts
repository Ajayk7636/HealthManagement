import { Routes } from '@angular/router';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { PrescriptionFormComponent } from './components/prescription-form/prescription-form.component';

export const DOCTOR_ROUTES: Routes = [
    { path: '', component: DoctorListComponent },
    { path: 'add', component: DoctorFormComponent },
    { path: 'edit/:id', component: DoctorFormComponent },
    { path: 'prescription/:appointmentId', component: PrescriptionFormComponent }
];
