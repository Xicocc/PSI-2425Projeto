import { Component, OnInit, OnDestroy } from '@angular/core';
import { PricingService } from '../pricing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pricing-list',
  standalone: false,
  templateUrl: './pricing-list.component.html',
  styleUrl: './pricing-list.component.css'
})
export class PricingListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['comfortLevel', 'pricePerMinute', 'nightSurchargePercent'];
  prices: any[] = [];
  private updateSubscription!: Subscription;

  constructor(private pricingService: PricingService) {}

  ngOnInit() {
    this.loadPrices();
    
    // Subscribe to price updates
    this.updateSubscription = this.pricingService.onPricesUpdated().subscribe(() => {
      this.loadPrices();
    });
  }

  loadPrices() {
    this.pricingService.getPricing().subscribe({
      next: (prices) => this.prices = prices,
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy() {
    // Clean up the subscription to avoid memory leaks
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
