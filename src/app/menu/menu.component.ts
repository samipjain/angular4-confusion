import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  // selectedDish: Dish;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  // Life cycle method
  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes =  dishes,
        errmess => this.errMess = <any>errmess);
    // .then is used for Promise
    // this.dishService.getDishes()
    //   .then(dishes => this.dishes =  dishes);
  }

  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }
}
