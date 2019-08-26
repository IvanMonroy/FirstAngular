import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent   { title = 'app';
products: any;
restItemsUrl = 'http://powerful-brushlands-67246.herokuapp.com/api/vehicles';

constructor(private http: HttpClient) {}

ngOnInit() {
  this.getRestItems();
}

// Read all REST Items
getRestItems(): void {
  this.restItemsServiceGetRestItems()
    .subscribe(
      products => {
        this.products = products;
      }
    )
}

// Rest Items Service: Read all REST Items
restItemsServiceGetRestItems() {
  return this.http
    .get<any[]>(this.restItemsUrl)
    .pipe(map(data => data));
}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/