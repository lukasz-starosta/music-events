import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {LandingComponent} from './landing/landing.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'events', component: EventsComponent},
  {path: 'profile', component: ProfileComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EventsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
