// client-login-component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-login',
  standalone: false,
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  nif: string = '';
  password: string = '';
  hidePassword: boolean = true;
  isLoading = false;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.isLoading = true;
    this.clientService.login(this.nif, this.password).subscribe({
      next: () => {
        this.router.navigate(['/client/dashboard']);
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.isLoading = false;
        let errorMessage = 'Login failed';
        if (err.error?.error) {
          errorMessage = err.error.error;
        }
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      }
    });
  }

  register() {
    this.router.navigate(['/client/register']);
  }
}