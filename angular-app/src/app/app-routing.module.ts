import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';

import { AuthGuard } from './guards/authGuard.service';
import { NotAuthGuard } from './guards/notAuthGuard.service';

const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      data: { title: 'Kwok\'s Intranet' },
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      component: LoginComponent,
      data: { title: 'Login' },
      canActivate: [NotAuthGuard]
    },
    {
      path: 'profile',
      loadChildren: 'app/profile/profile.module#ProfileModule',
      canLoad: [AuthGuard]
    },
    {
      path: 'posts',
      loadChildren: 'app/posts/posts.module#PostsModule',
      canLoad: [AuthGuard]
    },
    {
      path: 'service-request',
      loadChildren: 'app/service-request/service-request.module#ServiceRequestModule',
      canLoad: [AuthGuard]
    },
    {
      path: 'activity',
      loadChildren: 'app/activity/activity.module#ActivityModule',
      canLoad: [AuthGuard]
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
  