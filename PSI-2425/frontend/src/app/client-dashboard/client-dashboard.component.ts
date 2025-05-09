import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { TripService } from '../trip.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-client-dashboard',
  standalone: false,
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  currentClient: any;
  activeTrips: any[] = [];

  constructor(
    private clientService: ClientService,
    private tripService: TripService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentClient = this.clientService.getCurrentClient();
  }

  onTripCreated(newTrip: any) {
    this.activeTrips.unshift(newTrip); // Add to beginning of array
    this.snackBar.open('Viagem criada com sucesso!', 'Fechar', { duration: 3000 });
  }
}