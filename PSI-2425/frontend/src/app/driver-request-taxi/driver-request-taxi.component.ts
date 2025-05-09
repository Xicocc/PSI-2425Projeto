import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxiService } from '../taxi.service'; // Import only TaxiService

@Component({
  selector: 'app-driver-request-taxi',
  standalone: false,
  templateUrl: './driver-request-taxi.component.html',
  styleUrls: ['./driver-request-taxi.component.css']
})
export class DriverRequestTaxiComponent implements OnInit {
  taxiRequestForm: FormGroup;
  availableTaxis: any[] = []; // Array to store available taxis

  constructor(
    private fb: FormBuilder,
    private taxiService: TaxiService // Inject TaxiService to fetch available taxis
  ) {
    this.taxiRequestForm = this.fb.group({
      shiftStart: ['', [Validators.required]],
      shiftEnd: ['', [Validators.required]],
      taxiId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchAvailableTaxis(); // Fetch taxis when the component is initialized
  }

  fetchAvailableTaxis(): void {
    this.taxiService.getTaxis().subscribe(
      (taxis: any[]) => {
        this.availableTaxis = taxis; // Store the available taxis in the array
      },
      error => {
        console.error('Error fetching available taxis:', error);
      }
    );
  }

  submitRequest(): void {
    if (this.taxiRequestForm.valid) {
      console.log('Request Submitted:', this.taxiRequestForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
