import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PricingService } from '../pricing.service';

@Component({
  standalone: false,
  selector: 'app-pricing-form',
  templateUrl: './pricing-form.component.html',
  styleUrls: ['./pricing-form.component.css']
})
export class PricingFormComponent {
  comfortLevels = ['Básico', 'Luxuoso'];

  pricingData = {
    comfortLevel: '',
    pricePerMinute: null as number | null,
    nightSurchargePercent: null as number | null
  };

  constructor(private pricingService: PricingService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = {
        ...form.value,
        pricePerMinute: Number(form.value.pricePerMinute),
        nightSurchargePercent: Number(form.value.nightSurchargePercent)
      };

      this.pricingService.updatePricing(formData).subscribe({
        next: () => {
          alert('Preços atualizados com sucesso!');
          form.resetForm();
        },
        error: (err) => {
          alert(`Erro: ${err.message}`);
        }
      });
    }
  }
}