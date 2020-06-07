import {Injectable} from '@angular/core';
import {IUser} from "../types/IUser";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {IPatchUser} from "../types/IPatchUser";
import {apiUrl} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  fetchUser(email: string): Observable<IUser> {
    return this.http.get<IUser>(`${apiUrl}/user/${email}`);
  }

  clearUser(): void {
    this.user = undefined;
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

  patchUser(patchUserForm: IPatchUser): Observable<IUser> {
    return new Observable<IUser>(observer => {
      this.http.patch<IUser>(`${apiUrl}/user/${this.user.email}`, patchUserForm).subscribe(user => {
        this.user = user;
        observer.next(this.user);
        return observer.complete();
      })
    })
  }
}
