import { Component } from '@angular/core';
import { PricingService } from '../pricing.service';

@Component({
  selector: 'app-pricing-list',
  standalone: false,
  templateUrl: './pricing-list.component.html',
  styleUrl: './pricing-list.component.css'
})
export class PricingListComponent {
  displayedColumns: string[] = ['comfortLevel', 'pricePerMinute', 'nightSurchargePercent'];
  prices: any[] = [];
  

  constructor(private pricingService: PricingService,
  ) {
    this.loadPrices();
    
  }

  loadPrices() {
    this.pricingService.getPricing().subscribe({
      next: (prices) => this.prices = prices,
      error: (err) => console.error(err)
    });
  }

}
