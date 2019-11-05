import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { switchMap, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notifications/notification.service';

//import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private notificationService: NotificationService) {}
  
  handleError(error){    
    if(error instanceof HttpErrorResponse) {
      if(error.status === 400){
        if(typeof error.error === 'string' )
          this.notificationService.showError(error.error);
        else if("error" in error.error)
          this.notificationService.showError(error.error["error"]);        
      }
    }

    //return Observable.throw(error);    
    return throwError(error);
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let url:string = request.url;
    let currentUser = this.authenticationService.getLoggedUser();
    
    if(url.includes('/Authentication/Login') || url.includes('/Authentication/RefreshToken') || url.includes('/Company')){      
      request = request.clone();
      return next.handle(request).pipe(
        catchError((err) => this.handleError(err))
        );
    }
    else if(currentUser == null){
      this.authenticationService.logout();
    }
    else if(!currentUser.isValid()){
      return this.authenticationService.renew()
        .pipe(switchMap((response) => {
          let newLoggedUser = this.authenticationService.getLoggedUser();
          let clone = request.clone({
            setHeaders: {
              Authorization: `${newLoggedUser.token}`
              //Authorization: `Bearer ${this.auth.getToken()}`
            }
         });
          return next.handle(clone);
        }), catchError((err) => {
          if(err instanceof HttpErrorResponse) {
            if (err.status === 401){
                this.authenticationService.logout();
              }
          }
          return throwError(err);
        })
      );
    }
    else{
      request = request.clone({
         setHeaders: {
           Authorization: `${currentUser.token}`
         }
      });
      return next.handle(request).pipe(
        catchError((err) => this.handleError(err))
        );
    }
  }
}