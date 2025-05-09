// client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5000/api/clients';

  constructor(private http: HttpClient, private router: Router) {}

  login(nif: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { nif, password }).pipe(
      tap((response: any) => {
        // Store client data in localStorage
        localStorage.setItem('currentClient', JSON.stringify(response.client));
      })
    );
  }

  register(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, clientData);
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentClient');
  }

  getCurrentClient(): any {
    const client = localStorage.getItem('currentClient');
    return client ? JSON.parse(client) : null;
  }

  logout(): void {
    localStorage.removeItem('currentClient');
    this.router.navigate(['/client/login']);
  }
}