import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';
import { CreateServiceRequestComponent } from './create-service-request/create-service-request.component';
import { ApproveServiceRequestComponent } from './approve-service-request/approve-service-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RequestListComponent,
    data: { title: 'Service Request' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Service Request Dashboard' },
  },
  {
    path: 'create-service-request',
    component: CreateServiceRequestComponent,
    data: { title: 'Create Service Request' },
  },
  {
    path: 'approve-service-request',
    component: ApproveServiceRequestComponent,
    data: { title: 'Approve Service Request' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestRoutingModule { }
