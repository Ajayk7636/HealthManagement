import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PatientService } from '../../../../core/services/patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 class="mb-0 text-primary">Patient Records</h5>
        <button class="btn btn-primary btn-sm"><i class="bi bi-plus-lg me-1"></i> Register Patient</button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of patients">
                <td>#{{ p.id }}</td>
                <td><strong>{{ p.fullName }}</strong></td>
                <td>{{ p.age }}</td>
                <td>{{ p.gender }}</td>
                <td><span class="badge bg-danger">{{ p.bloodGroup }}</span></td>
                <td>{{ p.contactNumber }}</td>
                <td>
                  <button class="btn btn-outline-info btn-sm me-1" [routerLink]="['/patients/history', p.id]"><i class="bi bi-eye"></i></button>
                  <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-pencil"></i></button>
                </td>
              </tr>
              <tr *ngIf="patients.length === 0">
                <td colspan="7" class="text-center text-muted py-4">No patients found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe({
      next: (data) => this.patients = data,
      error: () => {
          // Mock data for demo if API is not connected
          this.patients = [
              { id: 1, fullName: 'Mr. Patient Zero', age: 30, gender: 'Male', bloodGroup: 'O+', contactNumber: '1234567890' }
          ];
      }
    });
  }
}
