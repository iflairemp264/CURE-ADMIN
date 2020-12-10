


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
// import { DashboardServiceService } from '../services/dashboard-service.service';
import { Observable } from 'rxjs';

@Injectable(
  // providedIn: 'root'
)
export class InterceptorService implements HttpInterceptor {
  //token;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/user/login')) {
      let authReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        }
      });
      return next.handle(authReq);
    }
    // else if (req.url.includes('http://176.31.215.237:5000/recipe/add')) {
    //   let authReq = req.clone({
    //     setHeaders: {
    //       'Content-Type': 'application/json',
    //       'Authorization': localStorage.getItem('_token')
    //     }
    //   });
    //   return next.handle(authReq);
    // }
    // else if (req.url.includes('http://176.31.215.237:5000/varietyCategory/add')) {
    //   console.log("inter workkkk")
    //   let authReq = req.clone({
    //     setHeaders: {
    //       'Content-Type': 'application/json',
    //       'Authorization': localStorage.getItem('_token')
    //     }
    //   });
    //   return next.handle(authReq);
    // }
    else {
      let authReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('_token')
        }
      });
      return next.handle(authReq);
    }

  }
}
