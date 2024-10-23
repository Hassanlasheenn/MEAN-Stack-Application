import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.scss']
})
export class OrderTrackComponent {
  order!: Order;

  constructor(
    _activatedRouter: ActivatedRoute,
    _orderService: OrderService,
  ) {
    const params = _activatedRouter.snapshot.params;
    if(!params.orderId) return;

    _orderService.trackOrderaById(params.orderId).subscribe(order => {
      this.order = order;
      const expirationTime = Date.now() + 60 * 60 * 1000;
      localStorage.setItem('orderIdExpiration', expirationTime.toString());
      localStorage.setItem('orderId', order.id.toString());
    });
  }
}
