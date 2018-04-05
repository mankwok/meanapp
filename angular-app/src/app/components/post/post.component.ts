import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  isLoading = false;
  username;
  posts;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) { }

  getPost(){
    this.isLoading = true;
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getPost();
  }

}
