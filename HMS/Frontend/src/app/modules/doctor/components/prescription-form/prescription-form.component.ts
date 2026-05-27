import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrescriptionService } from '../../../../core/services/prescription.service';
import { AppointmentService } from '../../../../core/services/appointment.service';

@Component({
  selector: 'app-prescription-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3">
        <h5 class="mb-0 text-primary">Write Prescription</h5>
      </div>
      <div class="card-body">
        <div class="alert alert-info" *ngIf="appointment">
          <strong>Patient:</strong> {{ appointment.patient?.fullName }} |
          <strong>Reason:</strong> {{ appointment.reason }}
        </div>

        <form [formGroup]="prescriptionForm" (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label class="form-label">Diagnosis</label>
            <textarea class="form-control" formControlName="diagnosis" rows="2"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Medicines</label>
            <textarea class="form-control" formControlName="medicines" rows="3" placeholder="Medicine Name - Dosage"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Dosage Instructions</label>
            <textarea class="form-control" formControlName="dosageInstructions" rows="2"></textarea>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Follow-up Date</label>
              <input type="date" class="form-control" formControlName="followUpDate">
            </div>
          </div>

          <div class="mt-4">
            <button type="submit" class="btn btn-success me-2" [disabled]="prescriptionForm.invalid">
              <i class="bi bi-check-lg me-1"></i> Save Prescription
            </button>
            <button type="button" class="btn btn-outline-secondary" [routerLink]="['/appointments']">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class PrescriptionFormComponent implements OnInit {
  prescriptionForm: FormGroup;
  appointment: any;
  appointmentId!: number;

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.prescriptionForm = this.fb.group({
      appointmentId: [0],
      diagnosis: ['', Validators.required],
      medicines: ['', Validators.required],
      dosageInstructions: ['', Validators.required],
      followUpDate: ['']
    });
  }

  ngOnInit(): void {
    this.appointmentId = +this.route.snapshot.params['appointmentId'];
    this.prescriptionForm.patchValue({ appointmentId: this.appointmentId });

    this.appointmentService.getAppointments().subscribe(data => {
      this.appointment = data.find((a: any) => a.id === this.appointmentId);
    });
  }

  onSubmit(): void {
    if (this.prescriptionForm.valid) {
      this.prescriptionService.createPrescription(this.prescriptionForm.value).subscribe(() => {
        this.router.navigate(['/appointments']);
      });
    }
  }
}
