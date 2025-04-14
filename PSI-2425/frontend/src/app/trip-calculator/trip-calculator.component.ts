import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PricingService } from '../pricing.service';


@Component({
  selector: 'app-trip-calculator',
  standalone: false,
  templateUrl: './trip-calculator.component.html',
  styleUrl: './trip-calculator.component.css'
})
export class TripCalculatorComponent {
  comfortLevels = ['Básico', 'Luxuoso'];
  calculationResult: any = null;

  tripForm = new FormGroup({
    comfortLevel: new FormControl('Básico', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required)
  });

  constructor(private pricingService: PricingService) {}

  calculateTrip() {
    if (this.tripForm.valid) {
      const formData = this.tripForm.value;
      
      // Convert to ISO string using native Date
      const calculationData = {
        comfortLevel: formData.comfortLevel!,
        startTime: new Date(formData.startTime!).toISOString(),
        endTime: new Date(formData.endTime!).toISOString()
      };

      this.pricingService.calculateTripCost(calculationData).subscribe({
        next: (response) => {
          this.calculationResult = response.body;
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Erro no cálculo: ' + err.message);
        }
      });
    }
  }

  // Simplified current time getter
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM format
  }
}