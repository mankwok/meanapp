import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

  user;
  postCount;
  serviceRequestCount;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.postCount = profile['postCount'];
      this.serviceRequestCount = profile['serviceRequestCount'];
    });

  }
}
