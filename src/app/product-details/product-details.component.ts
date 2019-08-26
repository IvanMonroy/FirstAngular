import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { products } from '../products';
import { CartService } from '../cart.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit { title = 'app'
product: any;
restItemsUrl = 'http://powerful-brushlands-67246.herokuapp.com/api/vehicles/:id';
  
addToCart(product) {
    window.alert('Vehículo añadido al carrito!');
    this.cartService.addToCart(product);
  }
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      this.product = products.find((obj) => (obj.id == parseInt(params.get('id'))));


    });
  }

}
