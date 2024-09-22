import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent {
  food!: Food;

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private _cartService: CartService,
    private _router: Router,
  ){
    activatedRoute.params.subscribe(params => {
      if(params.id) {
        this.food = foodService.getFoodById(params.id);
      }
    })
  }

  addToCart(): void {
    this._cartService.addToCart(this.food);
    this._router.navigateByUrl('/cart');
  }
}
