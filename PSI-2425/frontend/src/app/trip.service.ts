import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:5000/api/trips';

  constructor(private http: HttpClient) {}

  createTrip(tripData: any) {
    return this.http.post(this.apiUrl, tripData);
  }

  getClientTrips(clientId: string) {
    return this.http.get(`${this.apiUrl}/client/${clientId}`);
  }

  updateTripStatus(tripId: string, status: string) {
    return this.http.patch(`${this.apiUrl}/${tripId}/status`, { status });
  }
}