import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DriverService {
  private apiUrl = 'http://localhost:5000/api/drivers';
  private requestTimeout = 30000;

  constructor(private http: HttpClient) {}

  registerDriver(driverData: any) {
    return this.http.post(this.apiUrl, driverData, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      timeout(this.requestTimeout),
      catchError(this.handleError)
    );
  }

  getDrivers() {
    return this.http.get<any[]>(this.apiUrl).pipe(
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
      return throwError(() => new Error(
        `Backend Error: ${error.status} - ${error.error?.message || error.message}`
      ));
    }
  }

  deleteDriver(driverId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${driverId}`);
  }
}