import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripService } from '../trip.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-trip-request',
  standalone: false,
  templateUrl: './client-trip-request.component.html',
  styleUrls: ['./client-trip-request.component.css']
})
export class ClientTripRequestComponent {
  @Output() tripCreated = new EventEmitter<any>();
  isLoading = false;
  tripForm: FormGroup;

  comfortLevels = [
    { value: 'Básico', label: 'Básico' },
    { value: 'Luxuoso', label: 'Luxuoso' }
  ];

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {
    this.tripForm = this.fb.group({
      pickupLocation: ['', Validators.required],
      destination: ['', Validators.required],
      comfortLevel: ['standard', Validators.required],
      passengers: [1, [Validators.required, Validators.min(1), Validators.max(8)]]
    });
  }

  onSubmit() {
    if (this.tripForm.invalid) return;
    this.isLoading = true;
  
    const tripData = {
      pickupLocation: this.tripForm.value.pickupLocation,
      destination: this.tripForm.value.destination,
      comfortLevel: this.tripForm.value.comfortLevel,
      passengers: this.tripForm.value.passengers,
      client: this.clientService.getCurrentClient()._id // Changed from clientId to client
    };
  
    this.tripService.createTrip(tripData).subscribe({
      next: (trip) => {
        this.tripCreated.emit(trip);
        this.tripForm.reset({
          comfortLevel: 'Básico',
          passengers: 1
        });
        this.snackBar.open('Viagem solicitada com sucesso!', 'Fechar', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open('Erro ao criar viagem: ' + err.message, 'Fechar');
        this.isLoading = false;
      }
    });
  }
}