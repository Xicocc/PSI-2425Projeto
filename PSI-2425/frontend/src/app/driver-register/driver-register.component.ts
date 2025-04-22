import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DriverService } from '../driver.service';

interface AddressSuggestion {
  street: string;
  locality: string;
  district: string;
  postalCode: string;
}

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

  addressSuggestions: AddressSuggestion[] = [];
  manualAddressInput = false;
  isLoadingAddress = false;
  addressError = '';

  driverData = {
    name: '',
    nif: '',
    gender: '',
    birthYear: null as number | null,
    address: {
      street: '',
      postalCode: '',
      city: '',
      district: ''
    },
    licenseNumber: ''
  };

  constructor(private driverService: DriverService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Format data according to schema requirements
      const formData = {
        name: this.driverData.name.trim(),
        nif: this.driverData.nif.trim(),
        gender: this.driverData.gender,
        birthYear: Number(this.driverData.birthYear),
        address: {
          street: this.driverData.address.street.trim(),
          postalCode: this.driverData.address.postalCode.trim(),
          city: this.driverData.address.city.trim(),
          district: this.driverData.address.district.trim() // Add this line
        },
        licenseNumber: this.driverData.licenseNumber.toUpperCase().trim()
      };
  
      console.log('Submitting driver:', formData);
  
      this.driverService.registerDriver(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          alert('Condutor registado com sucesso!');
          form.resetForm();
          // Reset nested address object
          this.driverData.address = { street: '', postalCode: '', city: '' , district: ''};
        },
        error: (err) => {
          console.error('Registration error:', err);
          alert(`Erro no registo: ${err.error?.message || err.message}`);
        }
      });
    } else {
      // Log form errors for debugging
      console.log('Form errors:', form.errors);
      Object.keys(form.controls).forEach(key => {
        const controlErrors = form.controls[key].errors;
        if (controlErrors) {
          console.log('Control:', key, 'Errors:', controlErrors);
        }
      });
    }
  }

  formatPostalCode(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.substring(0, 4) + '-' + value.substring(4, 7);
    }
    this.driverData.address.postalCode = value;

    if (value.length === 8 && !this.manualAddressInput) {
      this.fetchAddress(value);
    }
  }

  fetchAddress(postalCode: string) {
    this.isLoadingAddress = true;
    this.addressError = '';
    this.addressSuggestions = [];
    
    this.driverService.getAddressByPostalCode(postalCode).subscribe({
      next: (response) => {
        this.addressSuggestions = [{
          street: response.street,
          locality: response.locality,
          district: response.district,
          postalCode: postalCode
        }];
        this.isLoadingAddress = false;
      },
      error: (err) => {
        this.addressError = 'Morada não encontrada. Por favor insira manualmente.';
        this.isLoadingAddress = false;
        this.manualAddressInput = true;
      }
    });
  }

  selectAddress(address: AddressSuggestion) {
    this.driverData.address = {
      street: address.street,
      postalCode: address.postalCode,
      city: address.locality, // Map locality to city
      district: address.district // Ensure district is included
    };
    this.addressSuggestions = [];
    this.manualAddressInput = false;
  }

  toggleManualInput() {
    this.manualAddressInput = !this.manualAddressInput;
    if (!this.manualAddressInput && this.driverData.address.postalCode.length === 8) {
      this.fetchAddress(this.driverData.address.postalCode);
    }
  }
}