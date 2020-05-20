import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISignUp} from "./ISignUp";
import {ILogin} from "./ILogin";
import {IJWTResponse} from "./IJWTResponse";

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

  constructor(private http: HttpClient) { }

  login(credentials: ILogin): Observable<IJWTResponse> {
    return this.http.post<IJWTResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: ISignUp): Observable<string> {
    return this.http.post<string>(this.signUpUrl, info, httpOptions);
  }
}
