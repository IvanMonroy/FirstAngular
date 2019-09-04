import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

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
  allProducts: Product[]

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductFormService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      plate: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      year: ['', [Validators.required]]
    });
    this.loadAllProducts();
    //this.saveProduct();
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
      product => {
        console.log(product);
        this.dataSaved = true;
        this.loadAllProducts();
      },
      err => {
        console.log(err);
        window.alert(err.error.errors[0]);
      }
    );
  }
  loadAllProducts() {
    this.productService.getAllProduct().subscribe(({ data }) => {
      console.log(data);
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
  saveProduct() {
    console.log("Save product()" + this.brand.value + this.plate.value + this.year.value);
    /*  let product = {id: 99, plate: 'JOJ-678',
    brand: 'Hiunday', year: 2009};
    this.productService.postProduct(product).subscribe(res => { 
         let artcl: Product = res.body;
         console.log(artcl.plate);
         console.log(res.headers.get('Content-Type'));		
         this.loadAllProducts();	  
       },
  (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
           //A client-side or network error occurred.				 
           console.log('An error occurred:', err.error.message);
         } else {
           //Backend returns unsuccessful response codes such as 404, 500 etc.				 
           console.log('Backend returned status code: ', err.status);
           console.log('Response body:', err.error);
         }
       }
    );*/
  };

}
