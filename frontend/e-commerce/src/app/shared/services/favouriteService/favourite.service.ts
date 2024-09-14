import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  private apiUrl = 'users'; 

  constructor(private _http: HttpClient) {}

  addFavourite(productId: string): Observable<any> {
    return this._http.post(`${this.apiUrl}/add-favourite`, {
      productId: productId,
    });
  }

  getFavourite(): Observable<any> {
    return this._http.get(`${this.apiUrl}/favourite`);
  }
  removeFavouriteItem(productId: string): Observable<any> {
    const params = new HttpParams().set('productId', productId);
    return this._http.delete(`${this.apiUrl}/favourite/`, {
      params,
    });
  }
}
