import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
      const formData = {
        ...form.value,
        licensePlate: form.value.licensePlate.toUpperCase(), // Ensure uppercase
        purchaseYear: Number(form.value.purchaseYear)
      };
  
      console.log('Submitting:', formData); // Debug log
  
      this.taxiService.registerTaxi(formData).subscribe({
        next: (response: any) => {
          console.log('Full response:', response); // Debug log
          alert('Taxi registered successfully!');
          form.resetForm();
        },
        error: (err) => {
          console.error('Registration error:', err);
          alert(`Registration failed: ${err.message}`);
        }
      });
    }
  }
}