import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRole: string | null = null;

  constructor(private router: Router) {
    // Listen to route changes to determine current role
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.includes('/admin')) {
        this.currentRole = 'admin';
      } else if (url.includes('/driver')) {
        this.currentRole = 'driver';
      } else if (url.includes('/client')) {
        this.currentRole = 'client';
      } else {
        this.currentRole = null;
      }
    });
  }

  returnToHome() {
    this.router.navigate(['/']);
  }
}