import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-control',
  imports: [CommonModule],
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.scss'],
})
export class QuantityControlComponent {
  @Input() quantity = 1;
  @Output() quantityChange = new EventEmitter<number>();

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  increase(): void {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }
}
