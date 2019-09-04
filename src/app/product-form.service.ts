import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Product } from './product-form/product';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface AllProduct {
    data: Product[];
    success: boolean
}

@Injectable({
    providedIn: 'root'
})
export class ProductFormService {
    title = 'app'
    restItemsUrl = 'http://powerful-brushlands-67246.herokuapp.com/api/vehicles';
    product: any;

    constructor(
        private http: HttpClient
    ) { }

    createProduct(product: Product): Observable<Product> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = {
            headers: httpHeaders
        };
        return this.http.post<Product>(this.restItemsUrl, product, options);

    }

    postProduct(product: Product): Observable<HttpResponse<Product>> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Product>(this.restItemsUrl, product,
            {
                headers: httpHeaders,
                observe: 'response'
            }
        );
    }

    getAllProduct(): Observable<AllProduct> {
        return this.http.get<AllProduct>(this.restItemsUrl)
            .pipe(map(data => data));

    }




}
