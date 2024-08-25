import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  getList(){
    return this.http.get('https://dummyjson.com/products')
  }  
  getproductList(){
    return this.http.get('http://localhost:3000/admin/products')
    
  }
  getProduct(id:any){
    return this.http.get(`https://dummyjson.com/products/${id}`)
  }
  getUserList(){
    return this.http.get('https://jsonplaceholder.org/users')
  }
}
