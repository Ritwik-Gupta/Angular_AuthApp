import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  loggedInUser:any = this.userService.getLoggedInUser();

  constructor(private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //Get the auth token from the Auth Service
    let authToken = this.authService.getAuthToken();
    let refreshToken = this.authService.getRefreshToken();
    let isRefresh = this.authService.getRefreshStatus();

    if(authToken && !isRefresh) {
      debugger;
      const IsTokenValid = this.isTokenValid(authToken);
      const loggedInUser = this.userService.getLoggedInUser();

      if(!IsTokenValid) {
        this.authService.setRefreshStatus(true)
        this.authService.tryRefreshToken(+loggedInUser.id).subscribe({
          next: (data:any) => {
            this.authService.setAuthToken(data.token)
            this.authService.setRefreshToken(data.refreshToken)
          },
          error: (err) => {
            this.toastr.error("Session expired! Please login again");
            this.authService.logout();
          }
        })
      }
    }
    else {
      this.authService.setRefreshStatus(false);
      //update the authToken again, if it was expired
      authToken = this.authService.getAuthToken();
      refreshToken = this.authService.getRefreshToken();
    }

    const authReq = request.clone({
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${authToken}`)
        .set('refreshToken', refreshToken ?? "")
    })

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        // debugger;
        let errMsg = "";

        if(err.status === 403)
          errMsg = "Resource access forbidden";
        else
          errMsg = err.error ?? err.message;

        this.toastr.error(errMsg);
        return throwError(() => {
          new Error(errMsg);
        })
      })
    );
  }

  // private handleTokenExpiry(request: HttpRequest<any>, next: HttpHandler) {
  //   return this.authService.tryRefreshToken(+this.loggedInUser.id).pipe(

  //     switchMap((data:any) => {

  //       this.authService.setAuthToken(data.token)
  //       this.authService.setRefreshToken(data.refreshToken)

  //       const authReq = request.clone({
  //         headers: new HttpHeaders()
  //           .set('Authorization', `Bearer ${data.token}`)
  //           .set('refreshToken', data.refreshToken ?? "")
  //       })

  //       return next.handle(authReq);
  //     })
  //   )
  // }

  private isTokenValid(token: string) {
    const tokenData = this.parseToken(token);
    return tokenData && tokenData.exp*1000 > Date.now();
  }

  private parseToken(token: string) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  }

}
