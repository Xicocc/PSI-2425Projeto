import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DriverService } from '../driver.service';

@Component({
  standalone: false,
  selector: 'app-driver-register',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent {
  genders = ['Masculino', 'Feminino'];
  currentYear = new Date().getFullYear();
  minBirthYear = 1900;
  maxBirthYear = this.currentYear - 18; // Minimum age 18

  driverData = {
    name: '',
    nif: '',
    gender: '',
    birthYear: null as number | null,
    address: {
      street: '',
      postalCode: '',
      city: ''
    },
    licenseNumber: ''
  };

  constructor(private driverService: DriverService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Format data according to schema requirements
      const formData = {
        ...form.value,
        nif: form.value.nif.trim(),
        birthYear: Number(form.value.birthYear),
        licenseNumber: form.value.licenseNumber.toUpperCase().trim(),
        address: {
          street: form.value.street.trim(),
          postalCode: form.value.postalCode.trim(),
          city: form.value.city.trim()
        }
      };

      console.log('Submitting driver:', formData);

      this.driverService.registerDriver(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          alert('Condutor registado com sucesso!');
          form.resetForm();
          // Reset nested address object
          this.driverData.address = { street: '', postalCode: '', city: '' };
        },
        error: (err) => {
          console.error('Registration error:', err);
          alert(`Erro no registo: ${err.error?.message || err.message}`);
        }
      });
    }
  }

  // Helper to format postal code (adds hyphen if missing)
  formatPostalCode(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.substring(0, 4) + '-' + value.substring(4, 7);
    }
    this.driverData.address.postalCode = value;
  }
}