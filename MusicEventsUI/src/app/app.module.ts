import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {LandingComponent} from './landing/landing.component';
import {EventsComponent} from './events/events.component';
import {ProfileComponent} from './profile/profile.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './auth/login/login.component';
import {SignUpComponent} from './auth/signup/signup.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./services/interceptor.service";
import {UsersComponent} from './users/users.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {LayoutComponent} from './layout/layout.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
  },
  {
    path: 'app', component: LayoutComponent,
    children:
      [
        {path: 'events', component: EventsComponent},
        {path: 'tickets', component: TicketsComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'users', component: UsersComponent},
      ]
  }, {path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EventsComponent,
    ProfileComponent,
    LoginComponent,
    SignUpComponent,
    UsersComponent,
    LayoutComponent,
    TicketsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
