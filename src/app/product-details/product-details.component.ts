import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { products } from '../products';
import { CartService } from '../cart.service'
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit { title = 'app'
product: any;
restItemsUrl: any;
  
addToCart(product) {
    window.alert('Vehículo añadido al carrito!');
    this.cartService.addToCart(product);
  }

deleteRegister(id) {
  this.deleteRestItem(id).subscribe( 
    message => {
    window.alert(message['message']);
  });
 
}
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restItemsUrl = 'http://powerful-brushlands-67246.herokuapp.com/api/vehicles/' + parseInt(params.get('id'));
      this.getRestItems();
    });
  }
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        product => {
          this.product = product;
          console.log(product);
        }
      )
  }
  
  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }

  // Rest Items Service: Delete register

  deleteRestItem(id: number): Observable<{}> {
    return this.http
    .delete(this.restItemsUrl, httpOptions)
    .pipe(
      (data) =>  data,
      catchError(this.handleError)
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
        window.alert(error.error.errors[0]);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  

}
