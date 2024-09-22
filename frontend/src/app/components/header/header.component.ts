import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartQuantity: number = 0;

  constructor(
    private _cartService: CartService
  ){
    this._cartService.getCartObservable()
    .subscribe((value: Cart) => {
      this.cartQuantity = value.totalCount;
    })
  }
}
