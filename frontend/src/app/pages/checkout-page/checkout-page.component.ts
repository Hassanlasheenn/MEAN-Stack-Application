import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  order: Order = new Order();
  checkoutForm!: FormGroup;

  get fc() {
    return this.checkoutForm.controls;
  }

  constructor(
    private _cartService: CartService,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _orderService: OrderService,
    private _router: Router,
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
      this._toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    if(!this.order.addressLatLng) {
      this._toastrService.warning('Please select your location on the map', 'Location');
      return;
    }
    
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this._orderService.create(this.order)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: () => {
        this._toastrService.success('Order is created successfully');
        // this._router.navigateByUrl('/payment');
      },
      error: (err) => {
        this._toastrService.error(err.error, 'Cart');
      }
    })
  }

  
  getCart(): void {
    const cart = this._cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
  }
}
