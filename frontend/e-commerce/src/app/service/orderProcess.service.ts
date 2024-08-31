import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class OrderprocessService {

  constructor(private http:HttpClient) { }

  createOrder(orderData: any): Observable<any> {
    const token = localStorage.getItem('Token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post("http://localhost:3002/api/orders/create", orderData, { headers });
  }
   
 
 
  
   getOrder(){
    const token = localStorage.getItem('Token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return  this.http.get(`http://localhost:3002/api/orders`,{headers})
  }

  
}
