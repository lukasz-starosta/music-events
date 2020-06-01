import {Injectable} from '@angular/core';
import {IUser} from "../types/IUser";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  fetchUser(email: string): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:8080/restApi/user/${email}`);
  }

  getUser(): Observable<IUser> {
    return new Observable<IUser>(observer => {
        if (!this.user) {
          this.fetchUser(this.tokenStorageService.getUsername()).subscribe((user: IUser) => {
            this.user = user;
            observer.next(this.user);
            return observer.complete();
          })
        } else {
          observer.next(this.user);
          observer.complete();
        }
      }
    )
  }
}
