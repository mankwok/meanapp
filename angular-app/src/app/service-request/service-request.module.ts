import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { RequestListComponent } from './request-list/request-list.component';
import { CreateServiceRequestComponent } from './create-service-request/create-service-request.component';

import { ServiceRequestService } from '../services/service-request.service';

@NgModule({
  imports: [
    CommonModule, 
    ServiceRequestRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [
    RequestListComponent,
    CreateServiceRequestComponent],
  providers: [
    ServiceRequestService
  ]
})
export class ServiceRequestModule {}
