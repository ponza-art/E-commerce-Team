import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { UserManagementService } from '../userServices/user-management.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'users';
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(
    private _http: HttpClient,
    private _userService: UserManagementService,
    private router: Router
  ) {
    
    this.updateCartItemCount();
  }

  addCart(productId: string, quantity: number = 1): Observable<any> {
    return this._http.patch(`${this.apiUrl}/add-cart`, {
      productId: productId,
      quantity: quantity,
    }).pipe(
      tap(() => this.updateCartItemCount())  
    );
  }

  decreaseCart(productId: string): Observable<any> {
    return this._http.patch(`${this.apiUrl}/decrese-cart`, {
      productId: productId,
      quantity: 1,
    }).pipe(
      tap(() => this.updateCartItemCount())  
    );
  }

  getCart(): Observable<any> {
    return this._http.get(`${this.apiUrl}/cart`);
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  updateCartItemCount(): void {
    this.getCart().pipe(
      switchMap(cart => {
        const itemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);
        return of(itemCount);
      })
    ).subscribe(count => this.cartItemCount.next(count));
  }

  removeCartItem(productId: string): Observable<any> {
    const params = new HttpParams().set('productId', productId);
    console.log(params);
    return this._http.delete(`${this.apiUrl}/cart`, { params })
    
      .pipe(tap(() => this.updateCartItemCount()));  
  }

  clearCart(dbOrderId: string): Observable<any> {
    const params = new HttpParams().set('dbOrderId', dbOrderId);
    return this._http.delete(`${this.apiUrl}/clear-cart`, { params })
      .pipe(tap(() => this.updateCartItemCount()));  
  }
}
