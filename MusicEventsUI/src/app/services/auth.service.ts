import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISignUp} from "../types/ISignUp";
import {ILogin} from "../types/ILogin";
import {IJWTResponse} from "../types/IJWTResponse";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/restApi/auth'
  private signUpUrl = this.authUrl + '/signup';
  private loginUrl = this.authUrl + '/login';
  private logoutUrl = this.authUrl + '/logout';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  login(credentials: ILogin): Observable<IJWTResponse> {
    return this.http.post<IJWTResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: ISignUp): Observable<string> {
    return this.http.post<string>(this.signUpUrl, info, httpOptions);
  }

  logout(): void {
    return this.tokenStorageService.logout();
  }
}
