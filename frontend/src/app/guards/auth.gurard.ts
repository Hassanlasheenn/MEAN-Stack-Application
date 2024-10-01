import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._userService.getUser.pipe(
      map((user: User) => {
        if(user && user?.token) {
          return true;
        } else {
          this._router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
