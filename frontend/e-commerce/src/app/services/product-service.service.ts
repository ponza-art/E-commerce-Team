import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) {}
  getRequest(id?: string){
    return this.http.get('https://dummyjson.com/products');
  }

  getRequestDetails(id:string){
    return this.http.get('https://dummyjson.com/products/'+id);
  }
}
