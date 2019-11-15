import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, startWith, catchError } from 'rxjs/operators';

import { products } from '../products';
import { Observable, combineLatest, throwError } from 'rxjs';
import { Product } from '../product-form/product';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatRadioButton, MatRadioChange } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PizzaPartyComponent } from '../product-form/product-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductFormService } from '../product-form.service';

export interface DialogData {
  animal: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent {
    title = 'app';
  vehicles: Observable<any[]>;
  vehiclesFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  durationInSeconds = 5;
  animal: string;


  restItemsUrl = 'http://powerful-brushlands-67246.herokuapp.com/api/vehicles';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog

  ) {
    this.vehicles = http.get<any[]>('http://powerful-brushlands-67246.herokuapp.com/api/vehicles');
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.vehiclesFiltered = combineLatest(this.vehicles, this.filter$).pipe(
      map(([vehicles, filterString]) => vehicles['data'].filter(vehicle => vehicle.plate.indexOf(filterString) !== -1))
    );
    document.title = 'Vehículos';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialog1(id,brand, year, plate): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {id: id,brand: brand,year: year,plate: plate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  deleteRegister(id) {
    this.deleteRestItem(id).subscribe(
      message => {
        this.openSnackBar(message['message']);
      });

  }

  deleteRestItem(id: number): Observable<{}> {
    return this.http
      .delete(this.restItemsUrl + '/' + id, httpOptions)
      .pipe(
        (data) => data,
        catchError((e) => this.handleError(e))
      );
  };

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: message },

    });
  };

  onChange(mrChange: MatRadioChange) {
    if (mrChange.value == 0) {
      this.vehiclesFiltered = combineLatest(this.vehicles, this.filter$).pipe(
        map(([vehicles, filterString]) => vehicles['data'].filter(vehicle => vehicle.plate.indexOf(filterString) !== -1))
      );

    } else if (mrChange.value == 2) {
      this.vehiclesFiltered = combineLatest(this.vehicles, this.filter$).pipe(
        map(([vehicles, filterString]) => vehicles['data'].filter(vehicle => vehicle.total_entries == 0)));
    } else {
      this.vehiclesFiltered = combineLatest(this.vehicles, this.filter$).pipe(
        map(([vehicles, filterString]) => vehicles['data'].filter(vehicle => vehicle.total_entries > 0)));
    }

  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      this.openSnackBar(error.error.errors[0]);
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

@Component({
  selector: 'modal-component',
  templateUrl: 'modal-component.html',
})
export class ModalComponent implements OnInit {
  dataSaved = false;
  productForm: FormGroup;
  allProducts: Product[];
  durationInSeconds = 5;
  restItemsUrl: any;
  messages: any;
  data: any;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public info: DialogData,
    private formBuilder: FormBuilder,
    private productService: ProductFormService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restItemsUrl = 'http://powerful-brushlands-67246.herokuapp.com/api/vehicles/' + parseInt(params.get('id'));
      if (params.get('id') && params.get('brand')) {
        this.data = params['params'];
      };

    });
    this.productForm = this.formBuilder.group({
      plate: [this.data ? this.data.plate : '', [Validators.required]],
      brand: [this.data ? this.data.brand : '', [Validators.required]],
      year: [this.data ? this.data.year : '', [Validators.required]]
    });
  }
  openSnackBar(message: string) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: message },

    });
  }
  updateRegister(id) {
    var product = this.productForm.value;
    console.log(id + product);
    this.UpdateItem(id, product).subscribe(
      message => {
        this.openSnackBar(message['message']);
      });

  }
  onFormSubmit() {
    this.dataSaved = false;
    let product = this.productForm.value;
    this.productService.getAllProduct().subscribe(products => {
      let maxIndex = products['data'].length - 1;
      let maxIndexItem = products['data'][maxIndex];
      product.year = parseInt(product.year);
      //  product.id = maxIndexItem.id + 1;
      this.createProduct(product);
    });
    this.productForm.reset();
  }
  createProduct(product: Product) {
    this.productService.createProduct(product).subscribe(
      mssg => {
        this.dataSaved = true;
        this.messages = mssg['message']
        this.openSnackBar(this.messages);
      },
      err => {
        this.openSnackBar(err.error.errors[0]);
      }
    );
  }
  get plate() {
    return this.productForm.get('plate');
  }
  get brand() {
    return this.productForm.get('brand');
  }
  get year() {
    return this.productForm.get('year');
  }

  // Rest Items Service: Update register

  UpdateItem(id: number, product: Product): Observable<{}> {
    return this.http
      .put(this.restItemsUrl, product, httpOptions)
      .pipe(
        (data) => data,
        catchError((e) => this.handleError(e))
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      this.openSnackBar(error.error.errors[0]);
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/