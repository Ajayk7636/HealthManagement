import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3">
        <h5 class="mb-0 text-primary">{{ isEdit ? 'Edit Doctor' : 'Add New Doctor' }}</h5>
      </div>
      <div class="card-body">
        <form [formGroup]="doctorForm" (ngSubmit)="onSubmit()">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" formControlName="fullName">
            </div>
            <div class="col-md-6">
              <label class="form-label">User ID (System)</label>
              <input type="number" class="form-control" formControlName="userId">
            </div>
            <div class="col-md-6">
              <label class="form-label">Specialization</label>
              <input type="text" class="form-control" formControlName="specialization">
            </div>
            <div class="col-md-6">
              <label class="form-label">Department</label>
              <input type="text" class="form-control" formControlName="department">
            </div>
            <div class="col-md-4">
              <label class="form-label">Experience (Years)</label>
              <input type="number" class="form-control" formControlName="experience">
            </div>
            <div class="col-md-4">
              <label class="form-label">Consultation Fee</label>
              <input type="number" class="form-control" formControlName="consultationFee">
            </div>
             <div class="col-md-4">
              <label class="form-label">Availability (JSON)</label>
              <input type="text" class="form-control" formControlName="availability">
            </div>
          </div>
          <div class="mt-4">
            <button type="submit" class="btn btn-primary me-2" [disabled]="doctorForm.invalid">
              {{ isEdit ? 'Update Doctor' : 'Save Doctor' }}
            </button>
            <button type="button" class="btn btn-outline-secondary" [routerLink]="['/doctors']">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class DoctorFormComponent implements OnInit {
  doctorForm: FormGroup;
  isEdit = false;
  doctorId?: number;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      id: [0],
      userId: [0, Validators.required],
      fullName: ['', Validators.required],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
      experience: [0, Validators.required],
      consultationFee: [0, Validators.required],
      availability: ['{}']
    });
  }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];
    if (this.doctorId) {
      this.isEdit = true;
      this.doctorService.getDoctor(this.doctorId).subscribe(doctor => {
        this.doctorForm.patchValue(doctor);
      });
    }
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const doctor = this.doctorForm.value;
      if (this.isEdit) {
        this.doctorService.updateDoctor(this.doctorId!, doctor).subscribe(() => {
          this.router.navigate(['/doctors']);
        });
      } else {
        this.doctorService.createDoctor(doctor).subscribe(() => {
          this.router.navigate(['/doctors']);
        });
      }
    }
  }
}
