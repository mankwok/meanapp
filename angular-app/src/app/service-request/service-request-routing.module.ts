import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';
import { CreateServiceRequestComponent } from './create-service-request/create-service-request.component';

const routes: Routes = [
  {
    path: '',
    component: RequestListComponent,
    data: { title: 'Service Request' },
  },
  {
    path: 'create-service-request',
    component: CreateServiceRequestComponent,
    data: { title: 'Create Service Request' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestRoutingModule { }
