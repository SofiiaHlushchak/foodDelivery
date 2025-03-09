import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Order } from '../shared/interfaces/order.interface';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.API_URL}/api/orders`;
  private http = inject(HttpClient);

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  createOrder(orderData: Order): Observable<Order[]> {
    return this.http.post<Order>(this.apiUrl, orderData).pipe(
      switchMap(() => {
        return this.getUserOrders();
      }),
      tap((orders: Order[]) => {
        this.ordersSubject.next(orders);
      }),
      catchError(error => {
        console.error('Error creating order:', error);
        return of(this.ordersSubject.value || []);
      }),
      take(1)
    );
  }

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      tap(orders => {
        this.ordersSubject.next(orders);
      })
    );
  }

  getCachedUserOrders(): Observable<Order[]> {
    const cachedOrders = this.ordersSubject.value;

    return cachedOrders?.length ? of(cachedOrders) : this.getUserOrders();
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }
}
