import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentRole: string | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.detectCurrentRole();
    });
  }

  detectCurrentRole() {
    const url = this.router.url;
    if (url.includes('/admin') && url.split('/').length != 2) this.currentRole = 'admin';
    else if (url.includes('/driver') && url.split('/').length != 2) this.currentRole = 'driver';
    else if (url.includes('/client') && url.split('/').length != 2) this.currentRole = 'client';
    else this.currentRole = null;
  }

  returnToHome() {
    this.router.navigate(['/']);
  }
}