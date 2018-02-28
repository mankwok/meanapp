import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Routes, NavigationStart, NavigationEnd } from '@angular/router';
import { NgProgress, NgProgressModule} from 'ngx-progressbar';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';

import 'rxjs/add/operator/filter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ErrorNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgProgressModule
  ],
  providers: [
    AuthService,  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private ngProgress: NgProgress) { 

    router.events
       .filter(event => event instanceof NavigationStart)
       .subscribe(() => ngProgress.start());

    router.events
       .filter(event => event instanceof NavigationEnd)
       .subscribe(() => ngProgress.done());
  }
}
