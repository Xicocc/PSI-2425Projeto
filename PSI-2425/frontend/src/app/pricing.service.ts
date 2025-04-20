import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, timeout } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PricingService {
  private apiUrl = 'http://localhost:5000/api/pricing';
  private requestTimeout = 30000;

  private pricesUpdated$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  // Update or create pricing
  updatePricing(pricingData: {
    comfortLevel: 'Básico' | 'Luxuoso';
    pricePerMinute: number;
    nightSurchargePercent: number;
  }): Observable<any> {
    return this.http.put(this.apiUrl, pricingData, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      timeout(this.requestTimeout),
      catchError(this.handleError)
    );
  }

  // Get all pricing configurations
  getPricing(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      timeout(this.requestTimeout),
      catchError(this.handleError)
    );
  }

  notifyPricesUpdated() {
    this.pricesUpdated$.next();
  }

  // Listen for price updates
  onPricesUpdated(): Observable<void> {
    return this.pricesUpdated$.asObservable();
  }

  // Calculate trip cost
  calculateTripCost(calculationData: {
    comfortLevel: string;
    startTime: string;
    endTime: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate`, calculationData, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      timeout(this.requestTimeout),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error details:', error);
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return throwError(() => new Error(`Frontend Error: ${error.error.message}`));
    } else {
      // Backend error
      const errorMessage = error.error?.error?.details 
        ? error.error.error.details.join(', ') 
        : error.error?.message || error.message;
      return throwError(() => new Error(
        `Backend Error: ${error.status} - ${errorMessage}`
      ));
    }
  }
}