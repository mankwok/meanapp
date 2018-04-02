import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  username;
  email;
  engName;
  position;
  department;
  postCount;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.engName = profile.user.engName;
      this.position = profile.user.position;
      this.department = profile.user.department;
      this.postCount = profile.postCount;
    });

  }
}
