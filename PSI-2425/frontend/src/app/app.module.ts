import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TaxiRegisterComponent } from './taxi-register/taxi-register.component';
import { TaxiListComponent } from './taxi-list/taxi-list.component';
import { HomeComponent } from './home/home.component';
import { DriverRegisterComponent } from './driver-register/driver-register.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { PricingFormComponent } from './pricing-form/pricing-form.component';
import { TripCalculatorComponent } from './trip-calculator/trip-calculator.component';
import { PricingListComponent } from './pricing-list/pricing-list.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DriverLoginComponent } from './driver-login/driver-login.component';
import { ClientLoginComponent } from './client-login/client-login.component';

// Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientRegisterComponent } from './client-register/client-register.component';




@NgModule({
  declarations: [
    AppComponent,
    TaxiRegisterComponent,
    TaxiListComponent,
    HomeComponent,
    DriverRegisterComponent,
    DriverListComponent,
    PricingFormComponent,
    TripCalculatorComponent,
    PricingListComponent,
    DriverDashboardComponent,
    ClientDashboardComponent,
    AdminDashboardComponent,
    NavbarComponent,
    AdminLoginComponent,
    DriverLoginComponent,
    ClientLoginComponent,
    ClientRegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSortModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
