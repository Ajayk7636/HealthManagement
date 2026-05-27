import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent],
  template: `
    <div class="d-flex" id="wrapper">
      <app-sidebar></app-sidebar>
      <div id="page-content-wrapper" class="w-100 bg-light">
        <app-navbar></app-navbar>
        <div class="container-fluid p-4">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    #wrapper {
      overflow-x: hidden;
    }
    #page-content-wrapper {
      min-width: 100vw;
    }
    @media (min-width: 768px) {
      #page-content-wrapper {
        min-width: 0;
        width: 100%;
      }
    }
  `]
})
export class MainLayoutComponent {}
