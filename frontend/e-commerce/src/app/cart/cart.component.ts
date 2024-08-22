import { Component } from '@angular/core';
import { CartCardComponent } from "../cart-card/cart-card.component";
import { RouterLink, RouterLinkActive,  } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartcounterService } from '../service/cartcounter.service';
import { ProductcartService } from '../service/productcart.service';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartCardComponent,RouterLink,RouterLinkActive,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
   
//   products: any[] = [
//     {
//     "id": 1,
//       "title": "Essence Mascara Lash Princess",
//       "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//       "category": "beauty",
//       "price": 9.99,
//       "discountPercentage": 7.17,
//       "rating": 4.94,
//       "stock": 5,
//       "tags": ["beauty", "mascara"],
//       "brand": "Essence",
//       "sku": "RCH45Q1A",
//       "weight": 2,
//       "dimensions": { "width": 23.17, "height": 14.43, "depth": 28.01 },
//       "warrantyInformation": "1 month warranty",
//       "shippingInformation": "Ships in 1 month",
//       "availabilityStatus": "Low Stock",
//       "images": [
//         "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
//       ],
  
// }
//   ]
cartItems: any[] = [];
cartCounter: number = 0;
  constructor(
    private counterCart: CartcounterService,
    private cartItem: ProductcartService,
    private router: Router
  ) { }
  
  ngOnInit(){
    this.counterCart.getcartcount().subscribe(res=>{
      this.cartCounter=res
      console.log('Cart Counter:', res);})
    this.cartItem.getitemcart().subscribe(rescart=>{
      console.log('Cart Items:', rescart);
      this.cartItems=rescart
    
  })
  }
  increaseQuantity(item: any) {
    this.cartItem.updateCartItemQuantity(item, item.quantity + 1);
    this.counterCart.setcartcount(this.cartCounter+1)
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartItem.updateCartItemQuantity(item, item.quantity - 1);
      this.counterCart.setcartcount(this.cartCounter-1)
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: any) {
    this.cartItem.removeCartItem(item);
    this.counterCart.setcartcount(this.cartCounter - item.quantity);
    console.log("item quantity"+item.quantity)
  }
  
getTotalPrice() {
  return this.cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}
clearstorage(){
  localStorage.clear()
}
onCheckout() {
  // const totalPrice = this.getTotalPrice();
  // console.log('Navigating to checkout with:', {
  //   cartItems: this.cartItems,
  //   totalPrice: totalPrice
  // });

  
    
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       cartItems: this.cartItems,
  //       totalPrice: totalPrice
  //     }
  //   }
  //   this.router.navigate(['/checkout'], navigationExtras);
  // }
  localStorage.setItem("cartItem",JSON.stringify(this.cartItem.getitemcart))
  localStorage.setItem("",JSON.stringify(this.getTotalPrice))
  this.router.navigate(['/checkout']);
}
}