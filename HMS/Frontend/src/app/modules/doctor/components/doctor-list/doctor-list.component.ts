import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 class="mb-0 text-primary">Doctor Master</h5>
        <button class="btn btn-primary btn-sm" [routerLink]="['/doctors/add']">
          <i class="bi bi-plus-lg me-1"></i> Add Doctor
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Consultation Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let d of doctors">
                <td>#{{ d.id }}</td>
                <td><strong>{{ d.fullName }}</strong></td>
                <td>{{ d.specialization }}</td>
                <td>{{ d.department }}</td>
                <td>{{ d.experience }} Years</td>
                <td>{{ d.consultationFee | currency:'INR' }}</td>
                <td>
                  <button class="btn btn-outline-info btn-sm me-1" [routerLink]="['/doctors/edit', d.id]">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" (click)="deleteDoctor(d.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr *ngIf="doctors.length === 0">
                <td colspan="7" class="text-center text-muted py-4">No doctors found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DoctorListComponent implements OnInit {
  doctors: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => this.doctors = data,
      error: () => {
        // Fallback or error handling
      }
    });
  }

  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe(() => this.loadDoctors());
    }
  }
}
