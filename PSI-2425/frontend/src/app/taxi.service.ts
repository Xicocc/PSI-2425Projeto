import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaxiService {
  private apiUrl = 'http://localhost:5000/api/taxis';

  constructor(private http: HttpClient) {}

  registerTaxi(taxiData: any) {
    return this.http.post(this.apiUrl, taxiData);
  }

  getTaxis() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
