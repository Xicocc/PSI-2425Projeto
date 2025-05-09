import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxiRegisterComponent } from './taxi-register/taxi-register.component';
import { TaxiListComponent } from './taxi-list/taxi-list.component';
import { HomeComponent } from './home/home.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverRegisterComponent } from './driver-register/driver-register.component';
import { PricingFormComponent } from './pricing-form/pricing-form.component';
import { TripCalculatorComponent } from './trip-calculator/trip-calculator.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { DriverLoginComponent } from './driver-login/driver-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ClientRegisterComponent } from './client-register/client-register.component';


// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'driver', 
    children: [
      { path: '', component: DriverLoginComponent },
      { path: 'dashboard', component: DriverDashboardComponent }
    ]},
  { path: 'client', 
    children: [
      { path: '', component: ClientLoginComponent },
      { path: 'register', component: ClientRegisterComponent },
      { path: 'dashboard', component: ClientDashboardComponent }
    ]},
  { path: 'admin',
    children: [
      { path: '', component: AdminLoginComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'register-taxi', component: TaxiRegisterComponent },
      { path: 'list-taxi', component: TaxiListComponent },
      { path: 'register-driver', component: DriverRegisterComponent },
      { path: 'list-driver', component: DriverListComponent },
      { path: 'pricing', component: PricingFormComponent },
      { path: 'calculator', component: TripCalculatorComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
