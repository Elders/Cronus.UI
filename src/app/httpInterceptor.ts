import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable() export class AuthService implements HttpInterceptor{

  
      constructor(private injector: Injector) {
      }
  
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          let requestToForward = req;
  
          
              let token = localStorage.getItem("Token");
              if (token !== "") {
                  let tokenValue = "Bearer " + token;
                  requestToForward = req.clone({ setHeaders: { "Authorization": tokenValue } });
              
          } 
  
          return next.handle(requestToForward);
      }
  }
