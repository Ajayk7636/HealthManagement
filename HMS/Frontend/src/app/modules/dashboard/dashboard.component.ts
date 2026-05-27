import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row g-4">
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-primary text-white h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-uppercase mb-1">Total Patients</h6>
                <h2 class="mb-0">1,250</h2>
              </div>
              <i class="bi bi-person-heart fs-1 opacity-50"></i>
            </div>
            <div class="mt-3 small text-white-50">
              <i class="bi bi-arrow-up me-1"></i> 12% Since last month
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-success text-white h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-uppercase mb-1">Total Doctors</h6>
                <h2 class="mb-0">48</h2>
              </div>
              <i class="bi bi-person-badge fs-1 opacity-50"></i>
            </div>
            <div class="mt-3 small text-white-50">
              <i class="bi bi-plus me-1"></i> 2 New this week
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-warning text-white h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-uppercase mb-1">Appointments Today</h6>
                <h2 class="mb-0">15</h2>
              </div>
              <i class="bi bi-calendar-check fs-1 opacity-50"></i>
            </div>
            <div class="mt-3 small text-white-50">
              <i class="bi bi-clock me-1"></i> 5 Pending
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-info text-white h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-uppercase mb-1">Total Revenue</h6>
                <h2 class="mb-0">$24,500</h2>
              </div>
              <i class="bi bi-cash-stack fs-1 opacity-50"></i>
            </div>
            <div class="mt-3 small text-white-50">
              <i class="bi bi-graph-up me-1"></i> 8% Increase
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-header bg-white py-3">
            <h6 class="m-0 font-weight-bold text-primary">Patient Visits Overview</h6>
          </div>
          <div class="card-body">
            <div class="alert alert-light border text-center py-5">
              <i class="bi bi-bar-chart fs-1 text-muted d-block mb-3"></i>
              Chart placeholder: Hospital analytics would appear here.
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-header bg-white py-3">
            <h6 class="m-0 font-weight-bold text-primary">Recent Activities</h6>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div class="list-group-item py-3">
                <div class="d-flex w-100 justify-content-between small mb-1">
                  <strong>Dr. John Doe</strong>
                  <span class="text-muted">3 mins ago</span>
                </div>
                <p class="mb-0 small text-muted">Added a new prescription for Patient #102</p>
              </div>
              <div class="list-group-item py-3">
                <div class="d-flex w-100 justify-content-between small mb-1">
                  <strong>Receptionist</strong>
                  <span class="text-muted">1 hour ago</span>
                </div>
                <p class="mb-0 small text-muted">Confirmed appointment for Mr. Smith</p>
              </div>
              <div class="list-group-item py-3 text-center">
                <a href="#" class="small text-decoration-none">View All Activity</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
