import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Router, NavigationStart, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgProgressModule, NgProgressBrowserXhr} from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';

import { AuthGuard } from './guards/authGuard.service';
import { NotAuthGuard } from './guards/notAuthGuard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { PostResolveService } from './services/post-resolve.service';
import { PostDetailComponent } from './components/post-detail/post-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ErrorNotFoundComponent,
    LoginComponent,
    ProfileComponent,
    NavbarComponent,
    PostComponent,
    CreatePostComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgProgressModule
  ],
  providers: [
    AuthService,  
    AuthGuard,
    NotAuthGuard,
    PostService,
    PostResolveService,
    {provide: BrowserXhr, useClass: NgProgressBrowserXhr}
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
       .filter((event) => event instanceof NavigationEnd)
       .map(() => this.activatedRoute)
       .map((route) => {
         while (route.firstChild) route = route.firstChild;
         return route;
       })
       .filter((route) => route.outlet === 'primary')
       .mergeMap((route) => route.data)
       .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
