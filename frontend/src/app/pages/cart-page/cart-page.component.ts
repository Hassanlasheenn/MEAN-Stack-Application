import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/cartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cart!: Cart;

  constructor (
    private _cartService: CartService,
  ){
    this._cartService.getCartObservable()
    .subscribe(cart => {
      this.cart = cart;
    })
  }

  removeFromCart(cartItem: CartItem): void {
    this._cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string): void {
    const quantity = parseInt(quantityInString);
    this._cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
