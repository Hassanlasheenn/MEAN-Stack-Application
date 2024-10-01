import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.gurard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
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
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
