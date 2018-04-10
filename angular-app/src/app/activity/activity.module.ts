import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityListComponent } from './activity-list/activity-list.component';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule
  ],
  declarations: [ActivityListComponent]
})
export class ActivityModule { }
