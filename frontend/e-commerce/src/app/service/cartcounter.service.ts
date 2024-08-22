import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartcounterService {

  private addcart:BehaviorSubject<number>;
   
  constructor() {
    const savedCartCount = Number(localStorage.getItem('cartCount')) || 0;
    this.addcart = new BehaviorSubject<number>(savedCartCount);
   }
  getcartcount(){
   return this.addcart.asObservable();
  }

  setcartcount(newcounter:number){
    const validCounter = Math.max(newcounter, 0);
    this.addcart.next(validCounter);
    localStorage.setItem('cartCount', validCounter.toString());
    console.log("validcounter"+validCounter)
  }
}
