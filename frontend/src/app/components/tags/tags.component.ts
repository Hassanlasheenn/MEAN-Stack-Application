import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  tags?: Tag[];

  constructor(
    private _foodService: FoodService,
  ){}

  ngOnInit(): void {
    this.getFoodTags();
  }

  /**
   * @description method to get food tags
   * @return {void} void
   */
  getFoodTags(): void {
    this._foodService
    .getAllTags()
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (res: Tag[]) => {
        if(!res?.length) return;
        this.tags = res;
      },
      error: (err: Error) => console.error(err),
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
