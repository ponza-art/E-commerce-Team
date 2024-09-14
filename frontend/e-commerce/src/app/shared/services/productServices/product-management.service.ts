import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProductParams,
  WatchDetails,
  databaseWatchDetails,
} from '../../../core/models/watch-details';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  private apiUrl = 'products';

  constructor(private _http: HttpClient) {}

  
  createProduct(productData: WatchDetails) {
    return this._http.post(`${this.apiUrl}`, productData);
  }

  
  getAllProducts(
    paramsObj?: ProductParams
  ): Observable<databaseWatchDetails[]> {
    let params = new HttpParams();

    if (paramsObj?.gender) {
      params = params.set('gender', paramsObj.gender);
    }

    if (paramsObj?.brand) {
      params = params.set('brand', paramsObj.brand);
    }

    if (paramsObj?.category) {
      params = params.set('category', paramsObj.category);
    }
    if (paramsObj?.color) {
      params = params.set('color', paramsObj.color);
    }

    return this._http.get<databaseWatchDetails[]>(this.apiUrl, { params });
  }

  getfilters(filter: string) {
    return this._http.get(this.apiUrl + `/filter/${filter}`);
  }

  priceFilter(min: number, max: number) {

    return this._http.get<any[]>(this.apiUrl + `/pricefilter/${min}&${max}`);
  }

  getSomeProducts(): Observable<databaseWatchDetails[]> {
    return this._http.get<databaseWatchDetails[]>(
      `${this.apiUrl}/product/eight`
    );
  }

  getProductById(productId: string): Observable<databaseWatchDetails> {
    console.log(this._http.get<databaseWatchDetails>(`${this.apiUrl}/${productId}`));
    
    return this._http.get<databaseWatchDetails>(`${this.apiUrl}/${productId}`);
    
  }


  updateProduct(productData: any): Observable<databaseWatchDetails> {
    return this._http.put<databaseWatchDetails>(`${this.apiUrl}/${productData.productId}`, productData);
  }

  deleteOneProduct(productId: string): Observable<databaseWatchDetails> {
    return this._http.delete<databaseWatchDetails>(
      `${this.apiUrl}/${productId}`
    );
  }
}
