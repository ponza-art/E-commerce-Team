import { HttpInterceptorFn } from '@angular/common/http';
import { UserManagementService } from '../../shared/services/userServices/user-management.service';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { throwError } from 'rxjs';


const ongoingRequests = new Map<string, any>();

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'http://localhost:3000/';
  
  const _userManagement = inject(UserManagementService);
  const authData = _userManagement.getAuthData();
  const token = authData ? authData.token : null;

  
  const fullUrl = apiUrl + req.url;

  
  let newRequest = req.clone({
    url: fullUrl,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  });

  
  const requestKey = `${newRequest.method}-${fullUrl}`;

  console.log("Intercepted Request:", {
    url: fullUrl,
    method: newRequest.method,
    token: token ? 'present' : 'absent'
  });

  
  if (ongoingRequests.has(requestKey)) {
    console.log("Returning ongoing request for key:", requestKey);
    
    return ongoingRequests.get(requestKey);
  }

  
  const requestObservable = next(newRequest).pipe(
    switchMap(response => {
      
      ongoingRequests.delete(requestKey);
      console.log("Request complete:", response);
      return of(response);
    }),
    catchError((error) => {
      
      ongoingRequests.delete(requestKey);
      console.error('HTTP Error:', {
        error: error,
        message: error.error?.message || 'An error occurred'
      });
      return throwError(() => new Error(error.error?.message || 'An error occurred'));
    })
  );

  
  ongoingRequests.set(requestKey, requestObservable);
  console.log("Request stored:", requestKey);

  
  return requestObservable;
};
