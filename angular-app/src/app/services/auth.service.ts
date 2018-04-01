import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  domain = "http://localhost:3000/";
  token;
  user;
  options;

  constructor(private http: Http) {}

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'token': this.token
      })
    });
  }

  loadToken() {
    this.token = localStorage.getItem("token");
  }

  login(user) {
    return this.http
      .post(this.domain + "authentication/login", user)
      .map(res => res.json());
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + "authentication/profile", this.options)
      .map(res => res.json());
  }

  loggedIn(){
    return tokenNotExpired();
  }
}
