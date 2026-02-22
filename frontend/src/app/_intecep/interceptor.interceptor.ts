import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth=inject(AuthService)
  const token=auth.getToken()
  const snackBar=inject(MatSnackBar)
  const router=inject(Router)
  const authreq=token ? req.clone({setHeaders:{
    Authorization:`Bearer ${token}`
  }}):req
  return next(authreq).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status === 401 || error.status === 403){
        auth.logout();
        snackBar.open(
          'Session Expired.Please login again',
          'Ok',
          {
            duration:3000,
            verticalPosition:'top',
            horizontalPosition:'center'
          }
        )
        router.navigate(['/login'])
      }
      return throwError(()=>error)
    })
  )
};
