import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL, ORDER_NEW_ORDER, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/api-urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(
    private _http: HttpClient,
  ) { }
  
  create(order: Order) {
    return this._http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrder(): Observable<Order> {
    return this._http.get<Order>(ORDER_NEW_ORDER);
  }

  pay(order: Order): Observable<string> {
    return this._http.post<string>(ORDER_PAY_URL, order);
  }

  trackOrderaById(id: number): Observable<Order> {
    return this._http.get<Order>(`${ORDER_TRACK_URL}/${id}`);
  }
}
