import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../services/activity.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-activity-statistic',
  templateUrl: './activity-statistic.component.html',
  styleUrls: ['./activity-statistic.component.css']
})

export class ActivityStatisticComponent implements OnInit {
  processing = false;
  isLoading = false;
  username;
  activities;
  userlist;

  constructor(
    private authService: AuthService,
    private activityService: ActivityService,
    private flashMessagesService: FlashMessagesService
  ) { }

  getPost(){
    this.isLoading = true;
    this.activityService.getAllActivities().subscribe(data => {
      this.activities = data['activity'];
      this.isLoading = false;
    });
  }

  setUserList() {
    this.userlist = this.activities.bookmarkUsers;
  }

  ngOnInit() {
    this.getPost();
  }


}

