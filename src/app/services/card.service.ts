import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PaymentCard } from '../shared/interfaces/payment-card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = `${environment.API_URL}/api/payments`;
  private http = inject(HttpClient);

  saveCard(cardData: PaymentCard): Observable<PaymentCard> {
    return this.http.post<PaymentCard>(`${this.apiUrl}/save`, cardData);
  }

  getUserCards(): Observable<PaymentCard[]> {
    return this.http.get<PaymentCard[]>(`${this.apiUrl}`);
  }
}
