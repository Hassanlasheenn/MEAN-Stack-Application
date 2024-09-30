import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  food!: Food;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _foodService: FoodService,
    private _cartService: CartService,
    private _router: Router,
  ){}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      if(params.id) {
        this.getFoodById(params.id);
      }
    });
  }

  /**
   * @description method to get food by id
   * @param {number} foodId 
   * @return {void} void
   */
  getFoodById(foodId: number): void {
    this._foodService
    .getFoodById(foodId)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (res: Food) => {
        if(!res) return;
        this.food = res;
      },
      error: (err: Error) => console.error(err),
    })
  }


  /**
   * @description method to add to cart by calling service
   * @return {void} void
   */
  addToCart(): void {
    this._cartService.addToCart(this.food);
    this._router.navigateByUrl('/cart');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
