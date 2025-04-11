import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Add this import
import { TaxiService } from '../taxi.service';

@Component({
  standalone: false,
  selector: 'app-taxi-register',
  templateUrl: './taxi-register.component.html',
  styleUrls: ['./taxi-register.component.css']
})
export class TaxiRegisterComponent {
  brands = ['Mercedes', 'Toyota', 'BMW', 'Volkswagen'];
  models = ['Sedan', 'SUV', 'Van', 'Hybrid'];
  comfortLevels = ['Básico', 'Luxuoso'];
  currentYear = new Date().getFullYear();

  taxiData = {
    licensePlate: '',
    brand: '',
    model: '',
    purchaseYear: null as number | null,
    comfortLevel: ''
  };

  constructor(private taxiService: TaxiService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Convert purchaseYear to number before sending
      const formData = {
        ...form.value,
        purchaseYear: Number(form.value.purchaseYear)
      };
  
      this.taxiService.registerTaxi(formData).subscribe({
        next: (taxi) => {
          alert('Taxi registered successfully!');
          form.reset();
        },
        error: (err) => alert('Error: ' + err.error.error)
      });
    }
  }
}