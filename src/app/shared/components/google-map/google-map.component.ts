import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Input,
  inject,
  DestroyRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap } from '@angular/google-maps';
import { WebSocketService } from '../../../services/web-socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Order } from '../../interfaces/order.interface';
import { OrderStatus } from '../../enums/order-status.enum';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [CommonModule, GoogleMap],
  templateUrl: './google-map.component.html',
})
export class GoogleMapComponent implements AfterViewInit, OnInit {
  @Input() order!: Order;
  @Input() width = 'auto';
  @Input() height = 'auto';
  @Output() distanceChange = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<{
    status: OrderStatus;
    updatedAt: string;
  }>();

  @ViewChild(GoogleMap, { static: false }) googleMap: GoogleMap | undefined;

  private wsService = inject(WebSocketService);
  private destroyRef = inject(DestroyRef);

  private courierMarker: google.maps.marker.AdvancedMarkerElement | undefined;
  private fullRoute: google.maps.LatLngLiteral[] = [];

  mapId = environment.mapId;
  mapOptions: google.maps.MapOptions = {
    mapId: this.mapId,
    disableDefaultUI: true,
  };

  ngOnInit(): void {
    this.wsService.connect();

    this.wsService
      .getConnectionStatus()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isConnected => {
        if (isConnected) {
          this.wsService.sendMessage({ orderId: this.order._id ?? '' });
        }
      });

    this.wsService
      .getMessages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        this.handleWebSocketMessage(event);
      });
  }

  ngAfterViewInit(): void {
    if (this.googleMap) {
      this.initializeMap();
    }
  }

  private initializeMap(): void {
    const map = this.googleMap?.googleMap as google.maps.Map;
    map.setOptions({ mapId: this.mapId });
  }

  private handleWebSocketMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data);

    if (data.status) {
      this.statusChange.emit(data.status);
    }

    if (data.status && data.statusUpdatedAt) {
      this.statusChange.emit({
        status: data.status,
        updatedAt: data.statusUpdatedAt,
      });
    }

    if (data.distance !== null && data.distance !== undefined) {
      this.distanceChange.emit(data.distance);
    }

    if (data.restaurantCoords && data.userCoords) {
      this.createRoute(data.restaurantCoords, data.userCoords);
    }

    if (data.status === 'delivered') {
      this.wsService.close();
    }

    if (data.location && this.courierMarker) {
      this.courierMarker.position = data.location;

      const map = this.googleMap?.googleMap as google.maps.Map;
      map.panTo(data.location);
      map.setZoom(15);
    }
  }

  private createRoute(
    restaurantCoords: google.maps.LatLngLiteral,
    userCoords: google.maps.LatLngLiteral
  ): void {
    const map = this.googleMap?.googleMap as google.maps.Map;

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
    });

    const request: google.maps.DirectionsRequest = {
      origin: restaurantCoords,
      destination: userCoords,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        directionsRenderer.setDirections(result);
        this.fullRoute = this.extractRoute(result);
        this.startCourierMovement();
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  private extractRoute(
    result: google.maps.DirectionsResult
  ): google.maps.LatLngLiteral[] {
    const route = result.routes[0].legs[0].steps;
    return route.map(step => step.end_location.toJSON());
  }

  private startCourierMovement(): void {
    if (this.fullRoute.length === 0) return;

    const map = this.googleMap?.googleMap as google.maps.Map;

    this.courierMarker = new google.maps.marker.AdvancedMarkerElement({
      position: this.fullRoute[0],
      map: map,
    });
  }
}
