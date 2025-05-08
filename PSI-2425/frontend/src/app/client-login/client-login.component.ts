import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-login',
  standalone: false,
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(private router: Router) {}

  login() {
    console.log('Client login attempt:', this.username);
    this.router.navigate(['/client/dashboard']);
  }

  register() {
    this.router.navigate(['/client/register']);
  }
}