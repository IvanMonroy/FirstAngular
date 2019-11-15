import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { PizzaPartyComponent } from './product-form/product-form.component';
import { ModalComponent } from './product-list/product-list.component'
import { ProductFormService } from './product-form.service';
/*import { HttpModule } from '@angular/http'; */
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from "@angular/material";
import {MatInputModule} from '@angular/material';
import { MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';

import {MatButtonModule,MatCheckboxModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule, MatIconModule, MatDialogModule } from '@angular/material';
import { RateListComponent } from './rate-list/rate-list.component';





@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,MatSnackBarModule,MatInputModule,MatMenuModule,MatRadioModule,
    MatButtonModule,MatCheckboxModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule, MatIconModule,MatDialogModule,
  /*  HttpModule, */

    RouterModule.forRoot([ 
      //Vehicles
      { path: '', component: ProductListComponent },
      { path: 'vehicles/:id', component: ProductDetailsComponent },
      { path: 'vehicles', component: ProductListComponent },
      { path: 'new_vehicle', component: ProductFormComponent },
      { path: 'edit_vehicles/:id/:brand/:year/:plate', component: ModalComponent },
      //Rates
      { path: 'rates/:id', component: RateListComponent },
      { path: 'rates', component: RateListComponent },

    ]),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    PizzaPartyComponent,
    ModalComponent,
    RateListComponent,
    
  ],
  providers: [
    ProductFormService,
],
exports: [PizzaPartyComponent, ModalComponent],
entryComponents: [PizzaPartyComponent, ModalComponent],

  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/