import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { PostService } from "../../services/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  message;
  form;
  username;
  processing = false;
  postError = false;
  postSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private postService: PostService
  ) {
    this.createForm();
   }

  createForm() {
    this.form = this.formBuilder.group({
      title: ["", Validators.required],
      body: ["", Validators.required]
    });
  }

  disableForm() {
    this.form.controls["body"].disable();
    this.form.controls["title"].disable();
  }

  enableForm() {
    this.form.controls["body"].enable();
    this.form.controls["title"].enable();
  }

  onPostSubmit() {
    this.processing = true;
    this.disableForm();
    const post = {
      title: this.form.get("title").value,
      body: this.form.get("body").value,
      createdBy: this.username
    };
    this.postService.newPost(post).subscribe(data => {
      this.processing = false;
      if (!data.success) {
        this.postError = true;
        this.postSuccess = false;
        this.message = data.message;
        this.enableForm();
      } else {
        this.postError = false;
        this.postSuccess = true;
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(["/post"]);
        }, 5000);
      }
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });
  }
  
}
