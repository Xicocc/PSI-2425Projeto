import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-register',
  standalone: false,
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  genders = ['Masculino', 'Feminino'];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nif: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid) return;
    
    this.isLoading = true;
    this.clientService.register(this.registerForm.value).subscribe({
      next: (response) => {
        // Automatically log in after registration
        this.clientService.login(this.registerForm.value.nif, this.registerForm.value.password).subscribe({
          next: () => {
            this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
            this.router.navigate(['/client/dashboard']);
          },
          error: (loginErr) => {
            this.isLoading = false;
            this.snackBar.open('Registration complete! Please log in.', 'Close', { duration: 5000 });
            this.router.navigate(['/client/login']);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        let errorMessage = 'Registration failed';
        if (err.error?.error) {
          errorMessage = err.error.error;
        } else if (err.error?.details) {
          errorMessage = err.error.details.join(', ');
        }
        this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/client']); // Fixed path
  }
}
