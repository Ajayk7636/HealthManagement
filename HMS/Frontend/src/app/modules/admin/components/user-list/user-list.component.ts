import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-white d-flex justify-content-between align-items-center py-3">
        <h5 class="mb-0 text-primary">User Management</h5>
        <button class="btn btn-primary btn-sm" [routerLink]="['../create']">
          <i class="bi bi-person-plus me-1"></i> Add New User
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td><strong>{{ user.username }}</strong></td>
                <td>{{ user.email }}</td>
                <td><span class="badge bg-info text-dark">{{ user.role }}</span></td>
                <td>
                  <span class="badge" [ngClass]="user.isActive ? 'bg-success' : 'bg-danger'">
                    {{ user.isActive ? 'Active' : 'Disabled' }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-outline-secondary btn-sm me-1"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-outline-danger btn-sm"><i class="bi bi-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users = [
    { username: 'admin', email: 'admin@hms.com', role: 'Admin', isActive: true },
    { username: 'johndoe', email: 'dr.john@hms.com', role: 'Doctor', isActive: true },
    { username: 'receptionist01', email: 'rec@hms.com', role: 'Receptionist', isActive: true },
    { username: 'patient01', email: 'patient@gmail.com', role: 'Patient', isActive: true }
  ];

  constructor() {}
  ngOnInit(): void {}
}
