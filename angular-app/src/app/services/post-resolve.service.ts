import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from './post.service';

@Injectable()
export class PostResolveService implements Resolve<any> {

  constructor(
    private postService: PostService
  ) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.postService.getPost(route.paramMap.get('id'));
  }
}
