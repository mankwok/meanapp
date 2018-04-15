import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../services/activity.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-activity-bookmark',
  templateUrl: './activity-bookmark.component.html',
  styleUrls: ['./activity-bookmark.component.css']
})
export class ActivityBookmarkComponent implements OnInit {

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

  getActivity(user_id){
    this.isLoading = true;
    this.activityService.getBookmarkedActivities(user_id).subscribe(data => {
      this.activities = data['activity'];
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile['user']['username'];
      console.log(this.username);
      this.getActivity(this.username);
    });


  }

}
