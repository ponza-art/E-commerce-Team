import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderData } from '../../../core/models/watch-details';
import { UserManagementService } from '../userServices/user-management.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'order';

  constructor(
    private _http: HttpClient, private _userService: UserManagementService  ) {}

  
  createOrder(amount: number, order: any[]): Observable<any> {
    const orderData = { amount, order };
    return this._http.post(`${this.apiUrl}/create-order`, orderData);
  }

   
  getAllOrders(): Observable<any>{
    return this._http
    .get(`${this.apiUrl}`)
  }

  deleteOrderById(orderId: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${orderId}`);
  }
  
}
