import { Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';

export const PATIENT_ROUTES: Routes = [
    { path: '', component: PatientListComponent },
    { path: 'history/:id', component: PatientHistoryComponent }
];
