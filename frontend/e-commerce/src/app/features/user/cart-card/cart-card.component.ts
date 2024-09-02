import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [FontAwesomeModule],
templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent {
  @Input() productitem: any;
  trash = faTrash;
  @Output() increaseQuantity = new EventEmitter<any>();
  @Output() decreaseQuantity = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<any>();

  increaseQuantities(data: any) {
    this.increaseQuantity.emit(data);
  }

  decreaseQuantities(data: any) {
    this.decreaseQuantity.emit(data);
  }

  removeItems(data: any) {
    this.removeItem.emit(data);
  }
}
