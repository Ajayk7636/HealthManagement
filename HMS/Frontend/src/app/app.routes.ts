import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'admin',
                canActivate: [AuthGuard],
                data: { roles: ['Admin'] },
                loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES)
            },
            {
                path: 'patients',
                canActivate: [AuthGuard],
                loadChildren: () => import('./modules/patient/patient.routes').then(m => m.PATIENT_ROUTES)
            },
            {
                path: 'doctors',
                canActivate: [AuthGuard],
                data: { roles: ['Admin'] },
                loadChildren: () => import('./modules/doctor/doctor.routes').then(m => m.DOCTOR_ROUTES)
            },
            {
                path: 'billing',
                canActivate: [AuthGuard],
                loadChildren: () => import('./modules/billing/billing.routes').then(m => m.BILLING_ROUTES)
            },
            {
                path: 'reports',
                canActivate: [AuthGuard],
                data: { roles: ['Admin'] },
                loadChildren: () => import('./modules/reports/reports.routes').then(m => m.REPORT_ROUTES)
            }
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];
