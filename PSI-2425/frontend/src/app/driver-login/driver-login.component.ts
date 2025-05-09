import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from '../driver.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-driver-login',
  standalone: false,
  templateUrl: './driver-login.component.html',
  styleUrls: ['./driver-login.component.css']
})
export class DriverLoginComponent implements OnInit {
  driverControl = new FormControl('');
  drivers: any[] = [];
  filteredDrivers!: Observable<any[]>;

  constructor(
    private router: Router,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe({
      next: data => {
        this.drivers = data;
        this.filteredDrivers = this.driverControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterDrivers(value || ''))
        );
      },
      error: err => console.error('Error fetching drivers:', err)
    });
  }

  private _filterDrivers(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.drivers.filter(driver =>
      driver.nif.toLowerCase().includes(filterValue) ||
      driver.name.toLowerCase().includes(filterValue)
    );
  }

displayDriverName(driver: any): string {
  return driver ? driver.name : '';
}


  login(): void {
    const inputValue = this.driverControl.value;

    let driver = typeof inputValue === 'object'
      ? inputValue
      : this.drivers.find(d => d.nif === inputValue || d.name === inputValue);

    if (driver) {
      localStorage.setItem('loggedInDriver', JSON.stringify(driver));
      this.router.navigate(['/driver/dashboard']);
    } else {
      alert('Please select a valid driver.');
    }
  }
}
