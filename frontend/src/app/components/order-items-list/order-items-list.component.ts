import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/shared/models/cartItem';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss']
})
export class OrderItemsListComponent {
  @Input() order!: Order;
  @Input() isOrdered!: boolean;

  constructor(
    private _cartService: CartService,
  ) {}


  /**
   * @description method to remove item from the checkout page
   * @param {string} itemId 
   * @return {void} void
   */
  removeItem(item: CartItem): void {
    this.order.items = this.order.items.filter((orderItem: CartItem) => orderItem.food.id !== item.food.id);
    this._cartService.removeFromCart(item?.food?.id);
    this.order.totalPrice = this.order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
