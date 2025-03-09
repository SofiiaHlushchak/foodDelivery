import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private ws: WebSocket | null = null;
  private messageSubject = new Subject<MessageEvent>();
  private isConnected$ = new BehaviorSubject<boolean>(false);

  connect(): void {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
      this.ws = new WebSocket(environment.webSocketApiUrl);

      this.ws.onopen = () => {
        this.isConnected$.next(true);
      };

      this.ws.onmessage = event => {
        this.messageSubject.next(event);
      };

      this.ws.onclose = () => {
        this.isConnected$.next(false);
      };
    }
  }

  getMessages() {
    return this.messageSubject.asObservable();
  }

  getConnectionStatus() {
    return this.isConnected$.asObservable();
  }

  sendMessage(message: string | Record<string, string>): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  close(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
