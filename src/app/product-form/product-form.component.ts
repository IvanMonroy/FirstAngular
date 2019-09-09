import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductFormService } from '../product-form.service';
import { Product } from './product'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  dataSaved = false;
  productForm: FormGroup;
  allProducts: Product[];
  durationInSeconds = 5;
  restItemsUrl: any;
  messages: any;
  data: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductFormService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restItemsUrl = 'http://powerful-brushlands-67246.herokuapp.com/api/vehicles/' + parseInt(params.get('id'));
      if (params.get('id') && params.get('brand') ){
        this.data = params['params'];
      };

    });
    this.productForm = this.formBuilder.group({
      plate: [this.data ? this.data.plate : '', [Validators.required]],
      brand: [this.data ? this.data.brand : '', [Validators.required]],
      year:  [this.data ? this.data.year : '' , [Validators.required]]
    });
    this.loadAllProducts();
    //this.saveProduct();
  }
  openSnackBar(message: string) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
      data: {message: message},
      
    });
  }

  updateRegister(id, product) {
    product = this.productForm.value;
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
        this.loadAllProducts();
        this.messages = mssg['message']
        this.openSnackBar(this.messages);
      },
      err => {
        this.openSnackBar(err.error.errors[0]);
      }
    );
  }
  loadAllProducts() {
    this.productService.getAllProduct().subscribe(({ data }) => {
     this.allProducts = data
    });
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

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
  .mat-snack-bar-container{
    background: hotpink;
  }
    .example-pizza-party {
      color: #ce1818;
    }
  `],
})
export class PizzaPartyComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
  
}
