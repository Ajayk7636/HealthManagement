import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService } from '../../../../core/services/billing.service';

@Component({
  selector: 'app-billing-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3">
        <h5 class="mb-0 text-primary">Billing Records</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>Bill ID</th>
                <th>Patient</th>
                <th>Amount</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of bills">
                <td>#{{ b.id }}</td>
                <td>{{ b.appointment?.patient?.fullName }}</td>
                <td>{{ b.totalAmount | currency:'INR' }}</td>
                <td>{{ b.taxAmount | currency:'INR' }}</td>
                <td><strong>{{ (b.totalAmount + b.taxAmount) | currency:'INR' }}</strong></td>
                <td>
                  <span class="badge" [ngClass]="{'bg-success': b.paymentStatus === 'Paid', 'bg-warning': b.paymentStatus === 'Unpaid'}">
                    {{ b.paymentStatus }}
                  </span>
                </td>
                <td>{{ b.billDate | date:'medium' }}</td>
              </tr>
              <tr *ngIf="bills.length === 0">
                <td colspan="7" class="text-center text-muted py-4">No bills found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class BillingListComponent implements OnInit {
  bills: any[] = [];

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.getBills().subscribe(data => this.bills = data);
  }
}
