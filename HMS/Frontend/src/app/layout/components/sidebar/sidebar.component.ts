import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar border-end bg-white" id="sidebar-wrapper">
      <div class="sidebar-heading border-bottom bg-primary text-white py-4 px-3">
        <i class="bi bi-hospital me-2"></i> HMS Admin
      </div>
      <div class="list-group list-group-flush">
        <a routerLink="/dashboard" routerLinkActive="active" class="list-group-item list-group-item-action list-group-item-light p-3">
          <i class="bi bi-speedometer2 me-2"></i> Dashboard
        </a>
        <a *ngIf="userRole === 'Admin'" routerLink="/admin/users" routerLinkActive="active" class="list-group-item list-group-item-action list-group-item-light p-3">
          <i class="bi bi-people me-2"></i> User Management
        </a>
        <a *ngIf="['Admin', 'Receptionist'].includes(userRole)" routerLink="/patients" class="list-group-item list-group-item-action list-group-item-light p-3">
          <i class="bi bi-person-heart me-2"></i> Patient Management
        </a>
        <a routerLink="/appointments" class="list-group-item list-group-item-action list-group-item-light p-3">
          <i class="bi bi-calendar-event me-2"></i> Appointments
        </a>
        <a *ngIf="userRole === 'Doctor'" routerLink="/doctor/prescriptions" class="list-group-item list-group-item-action list-group-item-light p-3">
          <i class="bi bi-file-earmark-medical me-2"></i> Prescriptions
        </a>
        <a routerLink="/billing" class="list-group-item list-group-item-action list-group-item-light p-3">
          <i class="bi bi-receipt me-2"></i> Billing
        </a>
        <a routerLink="/reports" class="list-group-item list-group-item-action list-group-item-light p-3">
          <i class="bi bi-graph-up me-2"></i> Reports
        </a>
      </div>
    </div>
  `,
  styles: [`
    #sidebar-wrapper {
      min-height: 100vh;
      width: 250px;
      transition: margin 0.25s ease-out;
    }
    .sidebar-heading {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .list-group-item.active {
      background-color: #f8f9fa;
      color: #0d6efd;
      border-left: 4px solid #0d6efd;
    }
  `]
})
export class SidebarComponent {
  userRole: string = '';

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getRole() || '';
  }
}
