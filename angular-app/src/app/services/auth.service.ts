import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  domain = 'http://localhost:3000/api/';
  token;
  user;
  httpOptions;

  constructor(private http: HttpClient) {}

  createAuthenticationHeaders() {
    this.loadToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.token
      })
    };
  }

  loadToken() {
    this.token = localStorage.getItem('token');
  }

  login(user) {
    return this.http.post(this.domain + 'authentication/login', user);
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'profile', this.httpOptions);
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
