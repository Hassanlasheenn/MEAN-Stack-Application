import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  order: Order = new Order();

  constructor(
    private _orderService: OrderService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
      this.getNewOrder();
  }

  getNewOrder(): void {
    this._orderService.getNewOrder()
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (res: Order) => {
        this.order = res;
      },
      error: (err: Error) => {
        this._router.navigateByUrl('/checkout');
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
