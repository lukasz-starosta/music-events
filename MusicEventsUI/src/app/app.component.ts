import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome | MEIWA';
  private roles: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'admin') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    } else {
      this.authority = '';
      this.roles = [''];
    }
  }
}
