import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActivityService } from '../../services/activity.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})
export class ActivityCreateComponent implements OnInit {
  form;
  username;
  errorMessage;
  processing = false;
  postError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private activityService: ActivityService,
    private flashMessagesService: FlashMessagesService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      applicationDeadline: ['', Validators.required],
      venue: ['', Validators.required],
      vacancies: ['', Validators.required],
      min_ppl: ['', Validators.required],
      detail: ['', Validators.required]
    });
  }

  disableForm() {
    //this.form.controls['type'].disable();
  }

  enableForm() {
    //this.form.controls['type'].enable();
  }

  onPostSubmit() {
    this.processing = true;
    this.postError = false;
    this.disableForm();

    const activity = {
      name: this.form.get('name').value,
      type: this.form.get('type').value,
      startDate: this.form.get('start_time').value,
      endDate: this.form.get('end_time').value,
      applicationDeadline: this.form.get('applicationDeadline').value,
      venue: this.form.get('venue').value,
      vacancies: this.form.get('vacancies').value,
      minParticipants: this.form.get('min_ppl').value,
      detail: this.form.get('detail').value,
      createUser: this.username
    };

    this.activityService.newActivity(activity).subscribe(data => {
      this.processing = false;
      if (!data['success']) {
        this.postError = true;
        this.errorMessage = data['message'];
        this.enableForm();
      } else {
        this.flashMessagesService.show(data['message'], {
          cssClass: 'snackbar',
          timeout: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/activity']);
        }, 3000);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile['user']['username'];
    });
  }
}


/*

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-Create',
  templateUrl: './activity-Create.component.html',
  styleUrls: ['./activity-Create.component.css']
})
export class ActivityCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/
/*
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})

export class ActivityCreateComponent implements OnInit {
  /*
  form;
  username;
  errorMessage;
  processing = false;
  postError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private postService: PostService,
    private flashMessagesService: FlashMessagesService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  disableForm() {
    this.form.controls['body'].disable();
    this.form.controls['title'].disable();
  }

  enableForm() {
    this.form.controls['body'].enable();
    this.form.controls['title'].enable();
  }

  onPostSubmit() {
    this.processing = true;
    this.postError = false;
    this.disableForm();
    const post = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    };
    this.postService.newPost(post).subscribe(data => {
      this.processing = false;
      if (!data['success']) {
        this.postError = true;
        this.errorMessage = data['message'];
        this.enableForm();
      } else {
        this.flashMessagesService.show(data['message'], {
          cssClass: 'snackbar',
          timeout: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 3000);
      }
    });
  }

  goBack() {
    this.location.back();
  }
  */
/*
 constructor() { }

 ngOnInit() {
 }

}
*/