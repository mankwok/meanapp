import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class PostService {
  httpOptions;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: HttpClient) {}

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.authService.token
      })
    };
  }

  newPost(blog) {
    this.createAuthenticationHeaders();
    return this.http.post(
      this.domain + 'posts/newPost',
      blog,
      this.httpOptions
    );
  }

  getAllPosts() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'posts/all', this.httpOptions);
  }

  getPost(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'posts/single/' + id, this.httpOptions);
  }

  postComment(id, comment) {
    this.createAuthenticationHeaders();
    const commentData = {
      id: id,
      comment: comment
    };
    return this.http.post(
      this.domain + 'posts/comment/',
      commentData,
      this.httpOptions
    );
  }

  likePost(id) {
    this.createAuthenticationHeaders();
    const post = {
      id: id
    };
    return this.http.put(
      this.domain + 'posts/likePost/',
      post,
      this.httpOptions
    );
  }
}
