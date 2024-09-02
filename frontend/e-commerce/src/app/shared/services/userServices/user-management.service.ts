import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserDetails,
  UserLogin,
  passwordUpdation,
  updatedUser,
} from '../../../core/models/user-details';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppConfig } from '../../../../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private apiUrl = 'users';

  private currentUserImageSubject!: BehaviorSubject<string>;
  public currentUserImage!: Observable<string>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    const storedImage = this.getStoredImage();
    this.currentUserImageSubject = new BehaviorSubject<string>(storedImage);
    this.currentUserImage = this.currentUserImageSubject.asObservable();
  }
  checkUserLoginStatus() {
    const authData = this.getAuthData();
    if (authData) {
      this.loggedIn.next(true);
      if (authData.userImage) {
        this.currentUserImageSubject.next(authData.userImage);
      }
    } else {
      this.loggedIn.next(false);
    }
  }



  //-------- HTTP requests -------- 

  createUser(newUser: UserDetails): Observable<any> {
    return this._http
      .post(`${this.apiUrl}`, newUser)
  }

  loginUser(userData: UserLogin): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        const { token, userImage, role } = response;
        const authData = {
          token: token,
          userImage: userImage,
          role: role,
        };
        const authDataString = JSON.stringify(authData);
        localStorage.setItem('authData', authDataString);
        this.currentUserImageSubject.next(userImage);
        this.syncLocalCartWithServer(); // Sync cart after login
      })
    );
  }

  public syncLocalCartWithServer() {
    const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    if (localCart.length > 0) {
      localCart.forEach((item: any) => {
        this._http.patch(`${this.apiUrl}/add-cart`, {
          productId: item.productId,
          quantity: item.quantity,
        }).subscribe({
          next: () => {
            localStorage.removeItem('localCart'); // Clear local cart after syncing
          },
          error: (err) => console.error('Error syncing local cart:', err),
        });
      });
    }
  }

  getUserDetails(): Observable<any> {
    return this._http
      .get(`${this.apiUrl}/profile`)
  }

  // http reqest to store the user image string
  updateUserImage(imageString: string | null): Observable<any> {
    return this._http
      .post(
        `${this.apiUrl}/add-image`,
        { image: imageString },
      )
  }

  // http reqest to update user details
  updateUserDetails(userData: updatedUser): Observable<any> {
    return this._http
      .patch(`${this.apiUrl}`, userData,)
  }

  // http reqest to update user password
  updateUserPassword(passwords: passwordUpdation): Observable<any> {
    return this._http
      .patch(`${this.apiUrl}/password`, passwords)
  }

  // ------------other functions------------

  // get Auth data from localStorage 
  getAuthData() {
    const authDataString = localStorage.getItem('authData');
    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        return authData;
      } catch (error) {
        console.error('Error parsing authData from localStorage', error);
        return null;
      }
    }
    return null;
  }

  // to get user image
  private getStoredImage(): string {
    if (typeof window !== 'undefined') {
      const authData = this.getAuthData();
      if (authData && authData.userImage) {
        return authData.userImage;
      }
    }
    return AppConfig.defaultUserUrl;
  }

  // to check if user is login 
  get isLoggedIn(): Observable<boolean> {
    const authData = this.getAuthData()
    if (authData) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    return this.loggedIn.asObservable();
  }

  logoutUser() {
    localStorage.clear();
    this.currentUserImageSubject.next(AppConfig.defaultUserUrl);
  }
}
