import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

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
  ]
})
export class PostsModule { }
