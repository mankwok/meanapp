import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component'
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';

import { AuthGuard } from './guards/authGuard.service';
import { NotAuthGuard } from './guards/notAuthGuard.service';
import { PostResolveService } from './services/post-resolve.service';

const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      data: { title: 'Kwok\'s Intranet' },
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
      path: 'compose-post',
      component: CreatePostComponent,
      data: { title: 'Compose New Post' },
      canActivate: [AuthGuard]
    },
    {
      path: 'posts',
      component: PostComponent,
      data: { title: 'Posts' },
      canActivate: [AuthGuard]
    },
    {
      path: 'posts/:id',
      component: PostDetailComponent,
      canActivate: [AuthGuard],
      resolve: {
        postResolve: PostResolveService
      }
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
  