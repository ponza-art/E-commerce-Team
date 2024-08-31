import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductRequestService } from './product-request.service';

@Injectable({
  providedIn: 'root',
})
export class ProductcartService {
  
  // private cartItemsFromDatabase = new BehaviorSubject<any[]>(
  //   this.getCartItemsFromDataBase()
  // ) 

  private cartitemsubject = new BehaviorSubject<any[]>(this.getCartItemsFromLocalStorage());

  constructor(private cartfromdatabase: ProductRequestService) {
    // this.initializeCart();
  }

 

  // getCart() {
  //   const token = localStorage.getItem('Token');
  //   if(token){
  //     console.log(this.cartItemsFromDatabase)
  //     return this.cartItemsFromDatabase
  //   }else{
  //     return this.cartitemsubject.asObservable();
  //   }
  // }
 

  getitemcart() {
    
      return this.cartitemsubject.asObservable();
    
    
  }
  additemcart(item: any) {
    const currentItems = this.cartitemsubject.value;
    const quantity = item.quantity || 1;
    const itemIndex = currentItems.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );
    if (itemIndex === -1) {
      const newItems = [
        ...currentItems,
        { ...item, quantity: quantity, totalprice: item.price },
      ];
      this.cartitemsubject.next(newItems);
      this.updateLocalStorage(newItems);
      console.log(newItems);
    } else {
      currentItems[itemIndex].quantity += 1;
      currentItems[itemIndex].totalprice =
        currentItems[itemIndex].price * currentItems[itemIndex].quantity;
      const updatedItems = [...currentItems];
      this.cartitemsubject.next(updatedItems);
      this.updateLocalStorage(updatedItems);
    }
  }

  updateCartItemQuantity(item: any, quantity: number) {
    const currentItems = this.cartitemsubject.value;
    const itemIndex = currentItems.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );

    if (itemIndex !== -1) {
      currentItems[itemIndex].quantity = quantity;
      currentItems[itemIndex].totalprice =
        currentItems[itemIndex].price * quantity;
      this.cartitemsubject.next([...currentItems]);
      this.updateLocalStorage([...currentItems]);
    }
  }
  removeCartItem(item: any) {
    const currentItems = this.cartitemsubject.value.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    this.cartitemsubject.next(currentItems);
    this.updateLocalStorage(currentItems);
    console.log('Item removed:', currentItems);
  }
  private getCartItemsFromLocalStorage():any[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private updateLocalStorage(items: any[]) {
    const totalprice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    localStorage.setItem('cartItems', JSON.stringify(items));
    localStorage.setItem('totalprice', totalprice.toString());
  }

 checkout() {
    this.cartitemsubject.next([]);
    this.updateLocalStorage([]);
    console.log('Checkout completed, cart cleared.');
  }
  getTotalPrice(): number {
    return this.cartitemsubject.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  productcart:any[]=[]
  getDatabaseCart(){
    console.log(this.cartfromdatabase.getcartfromdatabase().subscribe((res)=>{this.productcart=res ;console.log(this.productcart)}))
    return this.cartfromdatabase.getcartfromdatabase()
  }
////////////////////////////////////////////////////////////
  // getCartItemsFromDataBase():any {
  //   const token = localStorage.getItem('Token');
    
  //   if (token) {
  //     console.log('Token exists, retrieving cart items...');
  //    return this.cartfromdatabase.getcartfromdatabase()
     
  //   } else {
  //     console.log('No valid token found, unable to retrieve cart items.');
  //     return [{massege:'No valid token found, unable to retrieve cart items.'}]
  //   }
   
  // }
  // private initializeCart() {
  //   const token = localStorage.getItem('Token');
    
  //   if (token) {
  //     console.log('Token exists, retrieving cart items from database...');
  //     this.cartfromdatabase.getcartfromdatabase().subscribe(
  //       (cartItems) => {
  //         this.cartitemsubject.next(cartItems);
  //         this.updateLocalStorage(cartItems);
  //       },
        
  //     );
  //   } else {
  //     console.log('No valid token found, using cart items from local storage.');
  //   }
  // }

 
  
}
