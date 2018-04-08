import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

import { PostResolveService } from './../services/post-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    data: { title: 'Posts' },
  },
  {
    path: 'compose-post',
    component: CreatePostComponent,
    data: { title: 'Compose New Post' },
  },
  {
    path: ':id',
    component: PostDetailComponent,
    data: { title: 'Post Detail' },
    resolve: {
      postResolve: PostResolveService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
