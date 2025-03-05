import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Order } from '../shared/interfaces/order.interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.API_URL}/api/orders`;
  private http = inject(HttpClient);

  private ordersSubject = new BehaviorSubject<Order[] | null>(null);
  public orders$ = this.ordersSubject.asObservable();

  createOrder(orderData: Order): Observable<Order | null> {
    return this.http.post<Order>(this.apiUrl, orderData).pipe(
      tap(newOrder => {
        const currentOrders = this.ordersSubject.getValue() || [];

        this.ordersSubject.next([...currentOrders, newOrder]);
      }),
      catchError(error => {
        console.error('Error creating order:', error);
        return of(null);
      })
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
    const cachedOrders = this.ordersSubject.getValue();

    return cachedOrders?.length ? of(cachedOrders) : this.getUserOrders();
  }
}
