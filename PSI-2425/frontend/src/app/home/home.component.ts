import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToDriver() {
    this.router.navigate(['/driver']);
  }

  navigateToClient() {
    this.router.navigate(['/client']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}