import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PostResolveService implements Resolve<any> {

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.postService.getPost(route.paramMap.get('id')).catch(err => {
      this.router.navigate(["/posts"]);
      return Observable.empty();
    });;
  }
}
