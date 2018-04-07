import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class PostService {
  options;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: Http) {}

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        token: this.authService.token
      })
    });
  }

  newPost(blog) {
    this.createAuthenticationHeaders();
    return this.http
      .post(this.domain + 'posts/newPost', blog, this.options)
      .map(res => res.json());
  }

  getAllPosts() {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'posts/all', this.options)
      .map(res => res.json());
  }

  getPost(id) {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + 'posts/single/' + id, this.options)
      .map(res => res.json());
  }

  postComment(id, comment) {
    this.createAuthenticationHeaders();
    const commentData = {
      id: id,
      comment: comment
    };
    return this.http
      .post(this.domain + 'posts/comment/', commentData, this.options)
      .map(res => res.json());
  }

  likePost(id) {
    this.createAuthenticationHeaders();
    const post = {
      id: id,
    };
    return this.http
      .put(this.domain + 'posts/likePost/', post, this.options)
      .map(res => res.json());
  }
}
