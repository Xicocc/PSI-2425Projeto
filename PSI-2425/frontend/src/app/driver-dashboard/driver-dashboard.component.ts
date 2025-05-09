import { Component, OnInit } from '@angular/core';
import { DriverSessionService } from '../driver-session.service'; // Import the session service

@Component({
  selector: 'app-driver-dashboard',
  standalone: false,
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {
  driver: any = null;

  constructor(private driverSessionService: DriverSessionService) {}

  ngOnInit(): void {
    // Get the logged-in driver from the session service
    this.driver = this.driverSessionService.getDriver();
    if (!this.driver) {
      // If no driver is logged in, redirect to login
      // You can also handle this with a more user-friendly way (like an alert)
      console.error('No driver logged in');
    }
  }
}
