import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Add this
import { FormsModule } from '@angular/forms'; // Add this
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TaxiRegisterComponent } from './taxi-register/taxi-register.component'; // Adjust paths
import { TaxiListComponent } from './taxi-list/taxi-list.component';

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



@NgModule({
  declarations: [
    AppComponent,
    TaxiRegisterComponent,
    TaxiListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add this
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
    MatRadioModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
