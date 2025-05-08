import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-login',
  standalone: false,
  templateUrl: './driver-login.component.html',
  styleUrls: ['./driver-login.component.css']
})
export class DriverLoginComponent {
  driverId: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(private router: Router) {}

  login() {
    console.log('Driver login attempt:', this.driverId);
    this.router.navigate(['/driver/dashboard']);
  }
}