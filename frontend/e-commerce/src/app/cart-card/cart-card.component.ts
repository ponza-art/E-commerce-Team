import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartcounterService } from '../service/cartcounter.service';
import { ProductcartService } from '../service/productcart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {
  @Input() productitem: any;
  @Output() increaseQuantity = new EventEmitter<any>();
  @Output() decreaseQuantity = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<any>();

  increaseQuantities(data:any){
    
     this.increaseQuantity.emit(data)
  }
  decreaseQuantities(data:any){
    this.decreaseQuantity.emit(data)
 }
  removeItems(data:any){
  this.removeItem.emit(data)
}
 


}
