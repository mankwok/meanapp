import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  expend = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogOutClick() {
    this.closeDrawer();
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  onBurgerClick() {
    this.expend = !this.expend;
  }

  closeDrawer() {
    this.expend = false;
  }

  ngOnInit() {}
}
