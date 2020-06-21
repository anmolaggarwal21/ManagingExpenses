import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { localStorageValues } from './LocalStorageValue';
import {  throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(private loaderService: LoaderService){
        
    }

intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
console.log("Intercepted ",req)
var token = localStorage.getItem(localStorageValues.idToken)
if (token != null) {
const headers = new HttpHeaders({
    'Authorization': 'bearer '+ token,
    'userid' : localStorage.getItem(localStorageValues.userId)
})
const newReq=req.clone({headers})
this.loaderService.show(); 
return next.handle(newReq).pipe(tap((event: HttpEvent<any>) => { 
    if (event instanceof HttpResponse) {
        this.loaderService.hide(); 
    }
  },
    (err: any) => {
        this.loaderService.hide(); 
  }));
this.loaderService.hide();

}
else{
    return next.handle(req).pipe(
  
        catchError((error : HttpErrorResponse) =>
       {
           
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
       } )
    )
}
}


}