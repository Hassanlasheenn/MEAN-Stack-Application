import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ResetPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'search/:searchTerm',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tag/:tag',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'food/:id',
    component: FoodPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
