import { Component } from '@angular/core';
import { TaxiService } from '../taxi.service';

@Component({
  standalone: false,
  selector: 'app-taxi-list',
  templateUrl: './taxi-list.component.html',
  styleUrls: ['./taxi-list.component.css']
})
export class TaxiListComponent {
  displayedColumns: string[] = ['licensePlate', 'brand', 'model', 'comfortLevel'];
  taxis: any[] = [];

  constructor(private taxiService: TaxiService) {
    this.loadTaxis();
  }

  loadTaxis() {
    this.taxiService.getTaxis().subscribe({
      next: (taxis) => this.taxis = taxis,
      error: (err) => console.error(err)
    });
  }
}