import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductcartService {
 
  
  private cartitemsubject=new BehaviorSubject<any[]>(this.getCartItemsFromLocalStorage())
  

  constructor(){
    console.log('Initial cart items from local storage:', this.getCartItemsFromLocalStorage());
  }
  getitemcart(){
    
    return this.cartitemsubject.asObservable()
  }
  additemcart(item:any){
   
   const currentItems=this.cartitemsubject.value 
   const quantity = item.quantity || 1;
   const itemIndex = currentItems.findIndex(cartItem => cartItem.id === item.id);
   if (itemIndex === -1) {
    const newItems = [...currentItems, { ...item, quantity: quantity ,totalprice:item.price}];
     this.cartitemsubject.next(newItems);
     this.updateLocalStorage(newItems);
    
   } else {
    
     currentItems[itemIndex].quantity += 1;
     currentItems[itemIndex].totalprice = currentItems[itemIndex].price * currentItems[itemIndex].quantity;
     const updatedItems = [...currentItems];
     this.cartitemsubject.next(updatedItems);
     this.updateLocalStorage(updatedItems);
   }

  }
 
  updateCartItemQuantity(item: any, quantity: number) {
    const currentItems = this.cartitemsubject.value;
    const itemIndex = currentItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (itemIndex !== -1) {
      currentItems[itemIndex].quantity = quantity;
      currentItems[itemIndex].totalprice = currentItems[itemIndex].price * quantity;
      this.cartitemsubject.next([...currentItems]);
      this.updateLocalStorage([...currentItems]);
    }
  }
  removeCartItem(item: any) {
    const currentItems = this.cartitemsubject.value.filter(cartItem => cartItem.id !== item.id);
    this.cartitemsubject.next(currentItems);
    this.updateLocalStorage(currentItems);
    console.log('Item removed:', currentItems);
  }
  private getCartItemsFromLocalStorage(): any[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private updateLocalStorage(items: any[]) {
  
    const totalprice = items.reduce((total, item) => total + (item.price * item.quantity), 0);  
    localStorage.setItem('cartItems', JSON.stringify(items));  
    localStorage.setItem('totalprice', totalprice.toString());
  }
  checkout() {
    this.cartitemsubject.next([]);
    this.updateLocalStorage([]);
    console.log('Checkout completed, cart cleared.');
  }
  getTotalPrice(): number {
    return this.cartitemsubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}


