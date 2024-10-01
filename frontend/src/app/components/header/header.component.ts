import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/Cart';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;
  userName: string = '';
  user: User | null = null; // Allow user to be null

  get isAuth(): boolean { // Change the return type to boolean
    return this.user !== null && this.user.token !== undefined; // Check if user is not null and has a token
  }
  
  constructor(
    private _cartService: CartService,
    private _userService: UserService,
    private _router: Router,
  ) {
    this._cartService.getCartObservable()
      .subscribe((value: Cart) => {
        this.cartQuantity = value.totalCount;
      });
  }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(): void {
    this._userService.getUser.subscribe((user: User | null) => {
      this.user = user;
      this.userName = user ? user.name : ''; // Use empty string if user is null
    });
  }

  onLogout(): void {
    this._userService.logout();
    this._router.navigate(['/login']);
    this.userName = ''; 
    this.user = null;
  }
}
