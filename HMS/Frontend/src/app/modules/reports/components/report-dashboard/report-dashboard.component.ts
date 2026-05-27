import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../core/services/report.service';

@Component({
  selector: 'app-report-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="card bg-primary text-white shadow-sm">
          <div class="card-body">
            <h6 class="card-title opacity-75">Total Patients</h6>
            <h3 class="mb-0">{{ summary.totalPatients }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-success text-white shadow-sm">
          <div class="card-body">
            <h6 class="card-title opacity-75">Total Revenue</h6>
            <h3 class="mb-0">{{ summary.totalRevenue | currency:'INR' }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-info text-white shadow-sm">
          <div class="card-body">
            <h6 class="card-title opacity-75">Today's Appointments</h6>
            <h3 class="mb-0">{{ summary.todayAppointments }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-warning text-dark shadow-sm">
          <div class="card-body">
            <h6 class="card-title opacity-75">Pending</h6>
            <h3 class="mb-0">{{ summary.pendingAppointments }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-header bg-white py-3">
        <h5 class="mb-0 text-primary">Monthly Revenue Report</h5>
      </div>
      <div class="card-body">
         <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of revenueData">
                <td>{{ r.year }}</td>
                <td>{{ r.month }}</td>
                <td>{{ r.amount | currency:'INR' }}</td>
              </tr>
            </tbody>
          </table>
         </div>
      </div>
    </div>
  `
})
export class ReportDashboardComponent implements OnInit {
  summary: any = {};
  revenueData: any[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getSummary().subscribe(data => this.summary = data);
    this.reportService.getRevenueByMonth().subscribe(data => this.revenueData = data);
  }
}
