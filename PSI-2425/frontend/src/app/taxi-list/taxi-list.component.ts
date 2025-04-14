import { Component } from '@angular/core';
import { TaxiService } from '../taxi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: false,
  selector: 'app-taxi-list',
  templateUrl: './taxi-list.component.html',
  styleUrls: ['./taxi-list.component.css']
})
export class TaxiListComponent {
  displayedColumns: string[] = ['licensePlate', 'brand', 'model','purchaseYear', 'comfortLevel', 'actions'];
  taxis: any[] = [];
  

  constructor(private taxiService: TaxiService,
    private snackBar: MatSnackBar
  ) {
    this.loadTaxis();
    
  }

  loadTaxis() {
    this.taxiService.getTaxis().subscribe({
      next: (taxis) => this.taxis = taxis,
      error: (err) => console.error(err)
    });
  }

  deleteTaxi(driverId: string): void {
    this.taxiService.deleteTaxi(driverId).subscribe({
      next: () => {
        this.loadTaxis();
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