import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxiRegisterComponent } from './taxi-register/taxi-register.component';
import { TaxiListComponent } from './taxi-list/taxi-list.component';

// app-routing.module.ts
const routes: Routes = [
  { path: 'register', component: TaxiRegisterComponent },
  { path: 'list', component: TaxiListComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
