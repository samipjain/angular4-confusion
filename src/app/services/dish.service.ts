import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

// Needed when serving data from local file
// import { DISHES } from '../shared/dishes';

// Needed when HTTP is implemented
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getDishes(): Promise<Dish[]> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES), 2000);
  //   });
  // }

  getDishes(): Observable<Dish[]> {
    // return Observable.of(DISHES).delay(2000);
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    // return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
    return this.restangular.one('dishes', id).get();
  }

  // Using Observable
  getFeaturedDish(): Observable<Dish> {
    // return Observable.of(DISHES.filter((dish) => (dish.featured))[0]).delay(2000);
    return this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[]> {
    // return Observable.of(DISHES.map(dish => dish.id)).delay(2000);
    return this.getDishes()
      .map(dishes => dishes.map(dish => dish.id))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  // Using promise
  /*getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);
    });
  }*/

}
