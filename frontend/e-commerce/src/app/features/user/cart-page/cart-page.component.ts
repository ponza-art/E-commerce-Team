import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { CartProduct } from '../../../core/models/watch-details';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { OrderService } from '../../../shared/services/orderService/order.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgIf, NgFor, CartCardComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalAmount: number = 0;

  constructor(
    private _cartService: CartService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getCartItems();
  }

  getCartItems(): void {
    this._cartService.getCart().subscribe(
      (res) => {
        this.cartProducts = res;
        console.log(res);
        
        this.calcTotalAmount();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  increaseQuantity(productId: string): void {
    this._cartService.addCart(productId).subscribe(
      () => this.getCartItems(),
      (err) => console.error(err)
    );
  }

  decreaseQuantity(productId: string): void {
    this._cartService.decreaseCart(productId).subscribe(
      () => this.getCartItems(),
      (err) => console.error(err)
    );
  }

  removeCartItem(productId: string): void {
    this._cartService.removeCartItem(productId).subscribe(
      () => this.getCartItems(),
      (err) => console.error(err)
    );
  }

  calcTotalAmount(): void {
    this.totalAmount = this.cartProducts.reduce(
      (acc, product) => acc + product.productId.price * product.quantity,
      0
    );
  }

  onCheckout(): void {
    const order = this.cartProducts.map(product => ({
      productId: product.productId._id,
      quantity: product.quantity,
    }));
  
    this.orderService.createOrder(this.totalAmount, order).subscribe(
      (response) => {
        Swal.fire('Success', 'Order placed successfully!', 'success');
        console.log(response);
        
        
        // Clear the cart after successful order placement
        this._cartService.clearCart(response.orderId).subscribe(
          () => {
            this.router.navigate(['/order-confirmation']);
          },
          (err) => {
            console.error('Failed to clear cart:', err);
          }
        );
      },
      (err) => {
        console.error('Order creation failed:', err);
        Swal.fire('Error', 'Failed to place order. Please try again.', 'error');
      }
    );
  }
}  