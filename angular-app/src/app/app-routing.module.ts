import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';

const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: '**',
      component: ErrorNotFoundComponent,
    }
  ];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(
        appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  