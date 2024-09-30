import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  foods: Food[] = [];

  constructor(
    private _foodService: FoodService,
    private _activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        if(params.searchTerm) {
          this.getAllFoodBySearchTerm(params.searchTerm);
        } else if(params.tag) {
          this.getAllFoodByTagName(params.tag);
        } else {
          this.getAllFoods();
        }
      }
    );
  }


  /**
   * @description method to get all foods
   * @return {void} void
   */
  getAllFoods(): void {
    this._foodService
    .getAll()
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (res: Food[]) => {
        if(!res?.length) return;
        this.foods = res;
      },
      error: (err: Error) => console.error(err),
    });
  }

  /**
   * @description method to get foods by search parameter
   * @param {string} searchTerm 
   * @return {void} void
   */
  getAllFoodBySearchTerm(searchTerm: string): void {
    this._foodService
    .getAllFoodBySearch(searchTerm)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (res: Food[]) => {
        if(!res?.length) return;
        this.foods = res;
      },
      error: (err: Error) => console.error(err),
    });
  }

  /**
   * @description method to get foods by tag name
   * @param {string} tagName 
   * @return {void} void
   */
  getAllFoodByTagName(tagName: string): void {
    this._foodService
    .getAllFoodByTag(tagName)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (res: Food[]) => {
        if(!res?.length) return;
        this.foods = res;
      },
      error: (err: Error) => console.error(err),
    });
  }

  /**
   * @description method to change the favorite property for the selected food
   * @param food 
   * @return {void} void
   */
  toggleFavorite(food: Food): void {
    food.favorite = !food.favorite;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
