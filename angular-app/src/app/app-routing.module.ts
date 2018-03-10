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
      data: { title: 'Man Kwok\'s Site' }
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { title: 'Dashboard' }
    },
    {
      path: 'login',
      component: LoginComponent,
      data: { title: 'Login' }
    },
    {
      path: '**',
      component: ErrorNotFoundComponent,
      data: { title: '404 Not Found' }
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
  