import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
      <div class="card shadow-lg border-0" style="max-width: 400px; width: 100%;">
        <div class="card-body p-5">
          <div class="text-center mb-4">
            <i class="bi bi-hospital fs-1 text-primary"></i>
            <h3 class="mt-2 fw-bold">HMS Portal</h3>
            <p class="text-muted">Please login to your account</p>
          </div>
          <form (ngSubmit)="onLogin()">
            <div class="mb-3">
              <label class="form-label">Username</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-person"></i></span>
                <input type="text" class="form-control" name="username" [(ngModel)]="username" required placeholder="Enter username">
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">Password</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input type="password" class="form-control" name="password" [(ngModel)]="password" required placeholder="Enter password">
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100 py-2 fw-bold" [disabled]="loading">
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
            <div class="mt-4 text-center small">
              <span class="text-muted">Need help?</span> <a href="#" class="text-decoration-none">Contact IT Support</a>
            </div>
          </form>
          <div *ngIf="error" class="alert alert-danger mt-3 py-2 small">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    body { background-color: #f8f9fa; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Invalid credentials or server error';
        this.loading = false;
      }
    });
  }
}
