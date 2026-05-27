import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PatientService } from '../../../../core/services/patient.service';
import { AppointmentService } from '../../../../core/services/appointment.service';

@Component({
  selector: 'app-patient-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-white py-3">
        <h5 class="mb-0 text-primary">Patient Details: {{ patient?.fullName }}</h5>
      </div>
      <div class="card-body" *ngIf="patient">
        <div class="row">
          <div class="col-md-3"><strong>Age:</strong> {{ patient.age }}</div>
          <div class="col-md-3"><strong>Gender:</strong> {{ patient.gender }}</div>
          <div class="col-md-3"><strong>Blood Group:</strong> {{ patient.bloodGroup }}</div>
          <div class="col-md-3"><strong>Contact:</strong> {{ patient.contactNumber }}</div>
        </div>
        <hr>
        <h6>Medical Notes</h6>
        <p>{{ patient.medicalNotes || 'No notes available.' }}</p>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-header bg-white py-3">
        <h5 class="mb-0 text-primary">Appointment History</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let a of appointments">
                <td>{{ a.appointmentDate | date:'medium' }}</td>
                <td>{{ a.doctorName }}</td>
                <td>{{ a.reason }}</td>
                <td><span class="badge bg-secondary">{{ a.status }}</span></td>
                <td>
                   <!-- Actions like view prescription could go here -->
                </td>
              </tr>
              <tr *ngIf="appointments.length === 0">
                <td colspan="5" class="text-center py-4">No appointments found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class PatientHistoryComponent implements OnInit {
  patient: any;
  appointments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.patientService.getPatient(id).subscribe(data => this.patient = data);

    // In a real app, we'd have a specific endpoint for patient history
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data.filter((a: any) => a.patientId == id);
    });
  }
}
