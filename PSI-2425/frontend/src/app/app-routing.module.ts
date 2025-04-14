import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxiRegisterComponent } from './taxi-register/taxi-register.component';
import { TaxiListComponent } from './taxi-list/taxi-list.component';
import { HomeComponent } from './home/home.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverRegisterComponent } from './driver-register/driver-register.component';
import { PricingFormComponent } from './pricing-form/pricing-form.component';
import { TripCalculatorComponent } from './trip-calculator/trip-calculator.component';

// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register-taxi', component: TaxiRegisterComponent },
  { path: 'list-taxi', component: TaxiListComponent },
  { path: 'register-driver', component: DriverRegisterComponent },
  { path: 'list-driver', component: DriverListComponent },
  { path: 'pricing', component: PricingFormComponent },
  { path: 'calculator', component: TripCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
