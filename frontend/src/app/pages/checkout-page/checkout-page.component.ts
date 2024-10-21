import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  get fc() {
    return this.checkoutForm.controls;
  }

  constructor(
    private _cartService: CartService,
    private _userService: UserService,
    private _fb: FormBuilder,
  ) {
    this.getCart();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let { name, address } = this._userService.currentUser;

    this.checkoutForm = this._fb.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  createOrder(): void {
    if(this.checkoutForm?.invalid) {
      console.log('form is invalid');
      return;
    }
    
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    console.log(this.order);
  }

  
  getCart(): void {
    const cart = this._cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }
}
