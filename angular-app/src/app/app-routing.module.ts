import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';

import { AuthGuard } from './guards/authGuard.service';
import { NotAuthGuard } from './guards/notAuthGuard.service';

const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      data: { title: 'Man Kwok\'s Site' },
      canActivate: [AuthGuard]
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { title: 'Dashboard' },
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
      component: ProfileComponent,
      data: { title: 'Profile' },
      canActivate: [AuthGuard]
    },
    {
      path: 'post/compose',
      component: CreatePostComponent,
      data: { title: 'Compose New Post' },
      canActivate: [AuthGuard]
    },
    {
      path: 'post',
      component: PostComponent,
      data: { title: 'Post' },
      canActivate: [AuthGuard]
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
  