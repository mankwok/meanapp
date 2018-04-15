import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  processing = false;
  activity;
  username;

  constructor(
     private activatedRoute: ActivatedRoute,
     private activityService: ActivityService,
     private authService: AuthService,
     private flashMessagesService: FlashMessagesService
   ) { }

  joinActivity() {
    this.processing = true;
    this.activityService.joinActivity(this.activity._id).subscribe(data => {
      this.processing = false;
      this.flashMessagesService.show(data['message'], {
        cssClass: 'snackbar',
        timeout: 3000
      });
      if (data['success']) {
        this.refresh();
      }
    });
  }

  addBookmark(id) {
    this.processing = true;
    this.activityService.addBookmark(this.activity._id).subscribe(data => {
      this.processing = false;
      this.flashMessagesService.show(data['message'], {
        cssClass: 'snackbar',
        timeout: 3000
      });
      if (data['success']) {
        //this.refresh();
      }
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

  refresh() {
    this.processing = true;
    this.activityService.getActivity(this.activity._id).subscribe(data => {
      this.activity = data['Activity'];
      this.processing = false;
    });
  }

  getActualVacanies() {
    return Number(this.activity.vacancies) - this.activity.participants.length;
  }

  getActivityStatus() {
    if (this.getActualVacanies() < 1) {
      return "Application Closed (Full)";
    } else if (new Date() > new Date(this.activity.applicationDeadline)) {
      if (this.activity.participants.length < Number(this.activity.minParticipants)) 
        return "Cancelled (Not enough participants)";
      else
        return "Application Closed (Expired)";
    } 

    return "Open for application";
  }

  getBookmarkIconClass() {
    if (this.activity.bookmarkUsers.includes(this.username)) 
      return "fas fa-bookmark";
    else 
      return "far fa-bookmark";
  }


  ngOnInit() {
    this.activity = this.activatedRoute.snapshot.data['ActivityResolve'].Activity;
    console.log(this.activatedRoute.snapshot.data['ActivityResolve'].Activity);
    //this.titleService.setTitle(this.activity.title);
    this.authService.getProfile().subscribe(profile => {
      this.username = profile['user']['username'];
    });
  }

}
