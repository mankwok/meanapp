import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  form;
  post;
  processing = false;
  newComment = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private postService: PostService,
    private flashMessagesService: FlashMessagesService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      comment: ["", Validators.required]
    });
  }

  disableForm() {
    this.form.controls["comment"].disable();
  }

  enableForm() {
    this.form.controls["comment"].enable();
  }

  resetForm() {
    this.form.reset();
  }

  onPostCommentClick() {
    let elmnt = document.getElementById("comment");
    elmnt.scrollIntoView();
    elmnt.focus();
  }

  refreshPost() {
    this.processing = true;
    this.postService.getPost(this.post._id).subscribe(data => {
      this.post = data.post;
      this.processing = false;
    });
    this.enableForm();
  }

  submitComment() {
    this.processing = true;
    this.disableForm();
    this.postService.postComment(this.post._id, this.form.get("comment").value,).subscribe(data => {
      this.processing = false;
      this.flashMessagesService.show(data.message, { cssClass: 'snackbar', timeout: 3000 })
      if (data.success) {
        this.refreshPost();
        this.resetForm();
      }
    });
  }

  likePost() {
    this.processing = true;
    this.disableForm();
    this.postService.likePost(this.post._id).subscribe(data => {
      this.processing = false;
      this.flashMessagesService.show(data.message, { cssClass: 'snackbar', timeout: 3000 })
      if (data.success) {
        this.refreshPost();
      }
    });
  }

  ngOnInit() {
    this.post = this.activatedRoute.snapshot.data['postResolve'].post;
    this.titleService.setTitle(this.post.title);
  }
}
