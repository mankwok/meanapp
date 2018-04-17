import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityBookmarkComponent } from './activity-bookmark/activity-bookmark.component';
import { ActivityResolveService } from '../services/activity-resolve.service';
import { ActivityStatisticComponent } from '../activity/activity-statistic/activity-statistic.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityListComponent,
    data: { title: 'Activity' },
  },
  {
    path: 'activity-create',
    component: ActivityCreateComponent,
    data: { title: 'Create New Activity' },
  },
  {
    path: 'activity-detail/:id',
    component: ActivityDetailComponent,
    data: { title: 'Activity Detail' },
    resolve: {
      ActivityResolve: ActivityResolveService
    }
  },
  {
    path: 'activity-bookmark',
    component: ActivityBookmarkComponent,
    data: { title: 'Activity Bookmark' }
  },
  {
    path: 'activity-statistic',
    component: ActivityStatisticComponent,
    data: { title: 'Activity Statistic' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
