import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true; // Added for password visibility toggle
  readonly expectedUsername = 'admin';
  readonly expectedPassword = 'admin';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    const isUsernameValid = this.username === this.expectedUsername;
    const isPasswordValid = this.password === this.expectedPassword;

    if (!isUsernameValid || !isPasswordValid) {
      this.handleFailedLogin();
      return;
    }

    this.router.navigate(['/admin/dashboard']);
  }

  private handleFailedLogin() {
    this.password = '';
    this.snackBar.open('Access Denied. Valid credentials required.', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}