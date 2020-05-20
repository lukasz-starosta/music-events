import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {LandingComponent} from './landing/landing.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./services/interceptor.service";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'events', component: EventsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EventsComponent,
    ProfileComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
