import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const ADMIN_ROUTES: Routes = [
    { path: 'users', component: UserListComponent },
    { path: '', redirectTo: 'users', pathMatch: 'full' }
];
