import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityBookmarkComponent } from './activity-bookmark/activity-bookmark.component';
import { ActivityStatisticComponent } from './activity-statistic/activity-statistic.component';

import { ActivityService } from '../services/activity.service';
import { ActivityResolveService } from '../services/activity-resolve.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ActivityRoutingModule],
  declarations: [
    ActivityListComponent,
    ActivityCreateComponent,
    ActivityDetailComponent,
    ActivityBookmarkComponent,
    ActivityStatisticComponent
  ],
  providers: [
    ActivityService, 
    ActivityResolveService
  ]
})
export class ActivityModule {}
