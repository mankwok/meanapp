import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {
  Router,
  NavigationStart,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';

import { Title } from '@angular/platform-browser';
import { BrowserXhr } from '@angular/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AuthGuard } from './guards/authGuard.service';
import { NotAuthGuard } from './guards/notAuthGuard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { PostResolveService } from './services/post-resolve.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorNotFoundComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard,
    PostService,
    PostResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        this.titleService.setTitle(event['title']);
        window.scrollTo(0, 0);
      });
  }
}
