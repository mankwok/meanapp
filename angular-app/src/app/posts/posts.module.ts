import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

import { PostService } from '../services/post.service';
import { PostResolveService } from '../services/post-resolve.service';


@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostComponent, 
    CreatePostComponent,
    PostDetailComponent
  ],
  providers: [
    PostService,
    PostResolveService
  ],
})
export class PostsModule { }
