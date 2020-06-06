import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  private roles: string[];
  public authority: string;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, public router: Router, private activatedRoute: ActivatedRoute) {
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

  logout(): void {
    this.authService.logout();
  }
}
