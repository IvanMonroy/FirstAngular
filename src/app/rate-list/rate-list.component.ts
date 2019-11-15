import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';

import { Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatRadioButton, MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss']
})
export class RateListComponent {
  title = 'app';
  rates: Observable<any[]>;
  ratesFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  
  restItemsUrl = 'http://powerful-brushlands-67246.herokuapp.com/api/rates';
  
  constructor(private http: HttpClient) {
    this.rates = http.get<any[]>('http://powerful-brushlands-67246.herokuapp.com/api/rates');
    console.log(this.rates);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.ratesFiltered = combineLatest(this.rates, this.filter$).pipe(
      map(([rates, filterString]) => rates['data'].filter(rate => rate.name.indexOf(filterString) !== -1))
    );
    document.title = 'Tarifas';
  }
  
  onChange(mrChange: MatRadioChange) {
    if (mrChange.value == 0){
      this.ratesFiltered = combineLatest(this.rates, this.filter$).pipe(
        map(([rates, filterString]) => rates['data'].filter(rate => rate.name.indexOf(filterString) !== -1))
      );
    
    }else if(mrChange.value == 2) {
      this.ratesFiltered = combineLatest(this.rates, this.filter$).pipe(
        map(([rates, filterString]) => rates['data'].filter(rate => rate.value >= 100 )));
    }else{
      this.ratesFiltered = combineLatest(this.rates, this.filter$).pipe(
        map(([rates, filterString]) => rates['data'].filter(rate => rate.value < 100 )));
    }
  } 
  

}
