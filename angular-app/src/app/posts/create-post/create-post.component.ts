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
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
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

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile['user']['username'];
    });
  }
}
