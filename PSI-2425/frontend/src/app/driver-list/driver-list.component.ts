import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: false,
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  drivers: any[] = [];
  displayedColumns: string[] = ['name', 'nif', 'gender', 'birthYear', 'license', 'address', 'actions'];

  constructor(
    private driverService: DriverService,
    private snackBar: MatSnackBar
  ) {
    this.loadDrivers();
  }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (data) => this.drivers = data,
      error: (err) => this.showError('Erro ao carregar condutores')
    });
  }

  deleteDriver(driverId: string): void {
    this.driverService.deleteDriver(driverId).subscribe({
      next: () => {
        this.loadDrivers();
        this.showSuccess('Condutor removido com sucesso');
      },
      error: (err) => this.showError('Erro ao remover condutor')
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}