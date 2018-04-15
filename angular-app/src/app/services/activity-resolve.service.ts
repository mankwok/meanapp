import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ActivityService } from './activity.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ActivityResolveService implements Resolve<any> {

  constructor(
    private activityService: ActivityService,
    private router: Router,
  ) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.activityService.getActivity(route.paramMap.get('id')).catch(err => {
      this.router.navigate(["/activity"]);
      return Observable.empty();
    });

/*

    var activity;
    this.activityService.getActivity(route.paramMap.get('id')).subscribe(data => {
      activity = data['Activity'];
    });

    return activity;

    return this.activityService.getActivity(route.paramMap.get('id')).catch(err => {
      this.router.navigate(["/activity"]);
      return Observable.empty();
    });
*/

/*
    return this.activityService.getActivity(route.paramMap.get('id')).catch(err => {
      this.router.navigate(["/activity"]);
      return Observable.empty();
    });


    return this.activityService.getActivity(route.paramMap.get('id')).subscribe(data => {
      data['Activity']

   this.activityService.getActivity(route.paramMap.get('id')).subscribe(data => {
    });

        return this.activityService.getActivity(route.paramMap.get('id')).catch(err => {
      this.router.navigate(["/activity"]);
      return Observable.empty();
    });
  }
  */
  }
}