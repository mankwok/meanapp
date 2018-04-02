import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { AuthService } from './auth.service';

@Injectable()
export class PostService {
  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'token': this.authService.token
      })
    });
  }

  newPost(blog) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'posts/newPost', blog, this.options).map(res => res.json());
  }

  getAllPosts() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'posts/all',  this.options).map(res => res.json());
  }
}
