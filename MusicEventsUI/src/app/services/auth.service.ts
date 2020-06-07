import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISignUp} from "../types/ISignUp";
import {ILogin} from "../types/ILogin";
import {IJWTResponse} from "../types/IJWTResponse";
import {TokenStorageService} from "./token-storage.service";
import {Authority} from "../types/Authority";
import {apiUrl} from "../constants";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${apiUrl}/auth`
  private signUpUrl = this.authUrl + '/signup';
  private loginUrl = this.authUrl + '/login';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private router: Router, private userService: UserService) {
  }

  isUser(): boolean {
    return this.getAuthority() === Authority.USER;
  }

  isAdmin(): boolean {
    return this.getAuthority() === Authority.ADMIN;
  }

  getAuthority(): Authority {
    if (this.tokenStorageService.getToken()) {
      return this.tokenStorageService.getAuthorities()[0] as Authority;
    }
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorageService.getToken();
  }

  login(credentials: ILogin): Observable<IJWTResponse> {
    return this.http.post<IJWTResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: ISignUp): Observable<string> {
    return this.http.post<string>(this.signUpUrl, info, httpOptions);
  }

  logout(): void {
    this.userService.clearUser();
    this.router.navigateByUrl('/').catch(console.error);
    return this.tokenStorageService.logout();
  }
}
