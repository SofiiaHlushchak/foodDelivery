import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Order } from '../shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.API_URL}/api/orders`;
  private http = inject(HttpClient);

  createOrder(orderData: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }
}
