import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.api.base_url;
  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  /* Register & Login */
  // registerUsers(obj) {
  //   return this.http.post(`${this.url}/user/register`, obj)
  //     .pipe(catchError(this.handleError));
  // }
  // verifyEmail(email) {
  //   return this.http.post(`${this.url}/user/verifyuser`, { email })
  //     .pipe(catchError(this.handleError));
  // }
  // forgotPassword(email) {
  //   return this.http.post(`${this.url}/user/forgotpassword`, { email })
  //     .pipe(catchError(this.handleError));
  // }
  // updatePassword(obj) {
  //   return this.http.post(`${this.url}/user/update-password`, obj)
  //     .pipe(catchError(this.handleError));
  // }
  // resetpassword(obj) {
  //   return this.http.post(`${this.url}/user/resetpassword`, obj)
  //     .pipe(catchError(this.handleError));
  // }
  // login(data) {
  //   return this.http.post(`${this.url}/user/login`, data)
  //     .pipe(catchError(this.handleError))
  // }
  // loginWithFb(data) {
  //   return this.http.post(`${this.url}/user/social`, { data })
  //     .pipe(catchError(this.handleError))
  // }
  // logout() {
  //   this.cookieService.delete('access_token');
  //   this.router.navigate(['/home']);
  //   this.toast.success('Logout Success');
  //   return true
  // }

  // getToken() {
  //   return this.cookieService.get('access_token');
  // }
  // isAuthenticated() {
  //   if (this.getToken()) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }
  // getUserInfo() {
  //   const token = this.getToken();
  //   if (token) {
  //     this.userInfo = this.jwtHelper.decodeToken(token);
  //     this.getLoggedInName.emit(this.userInfo.user);
  //     return this.userInfo
  //   }

  // }

  // isLoggedIn() {
  //   if (this.getToken()) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }


  /* Handle Global Error */
  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }


}
