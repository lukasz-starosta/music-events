import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse, HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {ErrorSnackbarService} from "./error-snackbar.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AuthService} from "./auth.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, private errorSnackbarService: ErrorSnackbarService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    return next.handle(authReq)
      .pipe(catchError((err: any, caught: Observable<HttpEvent<any>>) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403) {
            this.authService.logout();
            this.errorSnackbarService.showErrorSnackbar('Authorization failed. Please log in again.');
          } else {
            this.errorSnackbarService.showErrorSnackbar('Something went wrong. Try again. ❌')
          }
        }
        return new Observable<HttpEvent<any>>();
      }));
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
];
