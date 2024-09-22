import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  foods: Food[] = [];

  constructor(
    private _foodService: FoodService,
    activatedRoute: ActivatedRoute,
  ){
    activatedRoute.params.subscribe(
      (params) => {
        if(params.searchTerm) {
          this.foods = this._foodService.getAllFoodBySearch(params.searchTerm)
        } else if(params.tag) {
          this.foods = this._foodService.getAllFoodByTag(params.tag);
        } else {
          this.foods = this._foodService.getAll();
        }
      }
    )
  }

  /**
   * @description method to change the favorite property for the selected food
   * @param food 
   * @return {void} void
   */
  toggleFavorite(food: Food): void {
    food.favorite = !food.favorite;
  }
}
