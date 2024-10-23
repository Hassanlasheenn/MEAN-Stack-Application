import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { TagsComponent } from './components/tags/tags.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { TitleComponent } from './components/title/title.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ResetPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { OrderItemsListComponent } from './components/order-items-list/order-items-list.component';
import { MapComponent } from './components/map/map.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { AuthInterceptor } from './auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodPageComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotfoundComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ResetPasswordComponent,
    LoadingComponent,
    CheckoutPageComponent,
    TextInputComponent,
    InputContainerComponent,
    InputValidationComponent,
    OrderItemsListComponent,
    MapComponent,
    ThemeToggleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LoadingInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
