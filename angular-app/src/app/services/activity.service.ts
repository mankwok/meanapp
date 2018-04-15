import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class ActivityService {

  httpOptions;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: HttpClient) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.authService.token
      })
    };
  }

  newActivity(blog) {
    this.createAuthenticationHeaders();
    return this.http.post(
      this.domain + 'activities/activity-create',
      blog,
      this.httpOptions
    );
  }

  getAllActivities() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'activities/all', this.httpOptions);
  }

  getBookmarkedActivities(user_id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'activities/bookmark/' + user_id, this.httpOptions);
  }

  getActivity(id) {
    this.createAuthenticationHeaders();
    //console.log(this.http.get(this.domain + 'activities/single/' + id, this.httpOptions));
    return this.http.get(this.domain + 'activities/single/' + id, this.httpOptions);
  }

  joinActivity(id) {
    this.createAuthenticationHeaders();
    const post = {
      id: id
    };
    console.log(this.domain + 'activities/activity-join');

    return this.http.put(
      this.domain + 'activities/activity-join',
      post,
      this.httpOptions
    );
  }

  addBookmark(id) {
    this.createAuthenticationHeaders();
    const post = {
      id: id
    };

    return this.http.put(
      this.domain + 'activities/activity-bookmark',
      post,
      this.httpOptions
    );
  }

  addNotInterested(id) {
    this.createAuthenticationHeaders();
    const post = {
      id: id
    };

    return this.http.put(
      this.domain + 'activities/activity-not_intereted',
      post,
      this.httpOptions
    );
  }

}
