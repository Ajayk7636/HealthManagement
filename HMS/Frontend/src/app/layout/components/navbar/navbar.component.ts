import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
      <div class="container-fluid">
        <button class="btn btn-outline-primary btn-sm me-3" id="sidebarToggle">
          <i class="bi bi-list"></i>
        </button>
        <div class="ms-auto d-flex align-items-center">
          <span class="me-3 d-none d-md-inline text-muted">
            Welcome, <strong>{{ username }}</strong> ({{ role }})
          </span>
          <div class="dropdown">
            <button class="btn btn-link dropdown-toggle text-dark text-decoration-none" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle fs-5"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
              <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i> Profile</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i> Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><button (click)="onLogout()" class="dropdown-item text-danger"><i class="bi bi-box-arrow-right me-2"></i> Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  username: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.currentUserValue;
    this.username = user?.username || 'Guest';
    this.role = user?.role || 'None';
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
