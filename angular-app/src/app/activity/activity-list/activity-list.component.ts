import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../services/activity.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  processing = false;
  isLoading = false;
  username;
  activities;

  constructor(
    private authService: AuthService,
    private activityService: ActivityService,
    private flashMessagesService: FlashMessagesService
  ) { }

  addBookmark(id) {
    this.processing = true;
    this.activityService.addBookmark(id).subscribe(data => {
      this.processing = false;
      this.flashMessagesService.show(data['message'], {
        cssClass: 'snackbar',
        timeout: 3000
      });
    });
  }

  addNotInterested(id) {
    this.processing = true;
    this.activityService.addNotInterested(id).subscribe(data => {
      this.processing = false;
      this.flashMessagesService.show(data['message'], {
        cssClass: 'snackbar',
        timeout: 3000
      });
    });
  }


  getPost(){
    this.isLoading = true;
    this.activityService.getAllActivities().subscribe(data => {
      this.activities = data['activity'];
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getPost();
  }


}
