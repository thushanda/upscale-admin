import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err:HttpErrorResponse)=>{
      return throwError(()=>err)
    })
  )
};
