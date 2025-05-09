import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverSessionService {
  private driver: any = null;

  constructor() { }

  // Set the logged-in driver
  setDriver(driver: any): void {
    this.driver = driver;
  }

  // Get the logged-in driver
  getDriver(): any {
    return this.driver;
  }

  // Clear the session (when the user logs out)
  clearDriver(): void {
    this.driver = null;
  }
}
