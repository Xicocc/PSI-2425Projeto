import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DriverService } from '../driver.service';
import { DriverSessionService } from '../driver-session.service';

@Component({
  selector: 'app-driver-login',
  standalone: false,
  templateUrl: './driver-login.component.html',
  styleUrls: ['./driver-login.component.css']
})
export class DriverLoginComponent implements OnInit {

  /** Form control powering the autocomplete input */
  driverControl = new FormControl('');

  /** All drivers fetched from the backend */
  drivers: any[] = [];

  /** Autocomplete-filtered drivers (async pipe in template) */
  filteredDrivers!: Observable<any[]>;

  constructor(
    private router: Router,
    private driverService: DriverService,
    private driverSessionService: DriverSessionService
  ) {}

  /* ------------------------------------------------------------------
     Lifecycle
  ------------------------------------------------------------------ */
  ngOnInit(): void {
    this.driverService.getDrivers().subscribe({
      next: data => {
        this.drivers = data;

        /* Set up the observable that filters as the user types */
        this.filteredDrivers = this.driverControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterDrivers(value ?? ''))
        );
      },
      error: err => console.error('Erro ao obter condutores:', err)
    });
  }

  /* ------------------------------------------------------------------
     Template helpers
  ------------------------------------------------------------------ */
  /** Returns the name to show in the input once a driver is selected */
  displayDriverName(driver: any): string {
    return driver ? driver.name : '';
  }

  /** Filter logic used by the autocomplete */
  private filterDrivers(value: string): any[] {
    const filterValue = value.toString().toLowerCase();
    return this.drivers.filter(driver =>
      driver.nif.toLowerCase().includes(filterValue) ||
      driver.name.toLowerCase().includes(filterValue)
    );
  }

  /* ------------------------------------------------------------------
     Login action
  ------------------------------------------------------------------ */
  login(): void {
    const input = this.driverControl.value;

    /* If user chose from the list, input is already a driver object */
    let selectedDriver = typeof input === 'object' ? input : null;

    /* If they typed, try to match by NIF or name */
    if (!selectedDriver && input) {
      selectedDriver = this.drivers.find(
        d => d.nif === input || d.name === input
      );
    }

    /* Validate & continue */
    if (selectedDriver) {
      this.driverSessionService.setDriver(selectedDriver);
      this.router.navigate(['/driver/dashboard']);
    } else {
      alert('Por favor, selecione um condutor válido ou digite um NIF/nome existente.');
    }
  }
}
