import { HttpInterceptorFn } from '@angular/common/http';
import { UserManagementService } from '../../shared/services/userServices/user-management.service';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { throwError } from 'rxjs';

// A map to track ongoing requests
const ongoingRequests = new Map<string, any>();

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'http://localhost:3000/';
  
  const _userManagement = inject(UserManagementService);
  const authData = _userManagement.getAuthData();
  const token = authData ? authData.token : null;

  // Construct the full URL
  const fullUrl = apiUrl + req.url;

  // Clone the request with the new URL and headers
  let newRequest = req.clone({
    url: fullUrl,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  });

  // Generate a unique key for the request based on URL and method
  const requestKey = `${newRequest.method}-${fullUrl}`;

  console.log("Intercepted Request:", {
    url: fullUrl,
    method: newRequest.method,
    token: token ? 'present' : 'absent'
  });

  // Check if there is an ongoing request with the same key
  if (ongoingRequests.has(requestKey)) {
    console.log("Returning ongoing request for key:", requestKey);
    // Return the ongoing request observable
    return ongoingRequests.get(requestKey);
  }

  // Create a new observable for the request
  const requestObservable = next(newRequest).pipe(
    switchMap(response => {
      // Remove the request from the map when it's complete
      ongoingRequests.delete(requestKey);
      console.log("Request complete:", response);
      return of(response);
    }),
    catchError((error) => {
      // Handle the error and remove the request from the map
      ongoingRequests.delete(requestKey);
      console.error('HTTP Error:', {
        error: error,
        message: error.error?.message || 'An error occurred'
      });
      return throwError(() => new Error(error.error?.message || 'An error occurred'));
    })
  );

  // Store the request observable in the map
  ongoingRequests.set(requestKey, requestObservable);
  console.log("Request stored:", requestKey);

  // Return the observable
  return requestObservable;
};
