import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { RequestListComponent } from './request-list/request-list.component';
import { CreateServiceRequestComponent } from './create-service-request/create-service-request.component';

import { ServiceRequestService } from '../services/service-request.service';
import { RequestItemResolveService } from '../services/request-item-resolve.service';

import { ApproveServiceRequestComponent } from './approve-service-request/approve-service-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateServiceRequestItemComponent } from './create-service-request-item/create-service-request-item.component';
import { EditServiceRequestItemComponent } from './edit-service-request-item/edit-service-request-item.component';

@NgModule({
  imports: [
    CommonModule, 
    ServiceRequestRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [
    RequestListComponent,
    CreateServiceRequestComponent,
    ApproveServiceRequestComponent,
    DashboardComponent,
    CreateServiceRequestItemComponent,
    EditServiceRequestItemComponent],
  providers: [
    ServiceRequestService,
    RequestItemResolveService
  ]
})
export class ServiceRequestModule {}
