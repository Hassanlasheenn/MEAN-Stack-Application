import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  @Input() order!: Order;
  @ViewChild('paypal', {static: true}) paypalElement!: ElementRef;

  constructor(
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.onPaypalPay();
  }

  onPaypalPay(): void {
    const self = this;
    paypal
    .Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              }
            }
          ],
        });
      },

      onApprove: (data: any, actions: any) => {
        const payment = actions.order.capture();
        this.order.paymentId = payment.id;
        self._orderService.pay(this.order)
        .subscribe(
          {
            next: (orderId: string) => {
              this._cartService.clearCart();
              this._router.navigateByUrl('/track/' + orderId);
              this._toastrService.success(
                'Payment done successfully',
                'Success'
              );
            },
            error: (err: Error) => {
              this._toastrService.error('Payment Failed', 'Error');
            }
          }
        );
      },
      onError: (err: any) => {
        this._toastrService.error('Payment Failed', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
