import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {
   
  constructor(private http:HttpClient) { }
  getproduct(){
   return this.http.get("http://localhost:3002/api/products")
  }
  showProduct(id:any){
    return this.http.get(`https://dummyjson.com/products/${id}`)
  }

  getcartfromdatabase() {
    const token = localStorage.getItem('Token'); 

    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(header), 
      
    };
     console.log("hamada")
    return  this.http.get<[]>("http://localhost:3002/api/users/cart",requestOptions)
  }

  ////////////////////////////////////////////////////////////
  // getcartfromdatabase(): Observable<any[]> {
  //   const token = localStorage.getItem('Token');
  
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  
  //   this.http.get<any[]>("http://localhost:3002/api/users/cart", { headers }).subscribe(
  //     (cartItems) => {
  //       this.cartSubject.next(cartItems); // Update the BehaviorSubject with the latest data
  //     },
  //     (error) => {
  //       console.error('Error retrieving cart items:', error);
  //       this.cartSubject.next([]); // Emit an empty array if there's an error
  //     }
  //   );
  
  //   return this.cart$; // Return the Observable for subscribers
  // }
  
 
}
