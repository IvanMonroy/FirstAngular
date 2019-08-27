import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable()
export class ProductFormService {
    title = 'app'
    restItemsUrl: 'http://powerful-brushlands-67246.herokuapp.com/api/vehicles';
    product: any;

    constructor(
        private http: HttpClient
    ) { }

    createProduct(product: Product): Observable<Product> {
        let httpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json');
        let options = {
            headers: httpHeaders
        };
        return this.http.post<Product>(this.restItemsUrl, product, options);
    }

    postProduct(product: Product): Observable<HttpResponse<Product>> {
        let httpHeaders = new HttpHeaders({
             'Content-Type' : 'application/json'
        });    
        return this.http.post<Product>(this.restItemsUrl, product,
            {
              headers: httpHeaders,
              observe: 'response'
            }
        );
    }

    getAllProduct(): Observable<Product[]> {
        return this.http.get<Product[]>(this.restItemsUrl);
    }        




}