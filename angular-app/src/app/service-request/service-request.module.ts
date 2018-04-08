import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { RequestListComponent } from './request-list/request-list.component';

@NgModule({
  imports: [
    CommonModule,
    ServiceRequestRoutingModule
  ],
  declarations: [RequestListComponent]
})
export class ServiceRequestModule { }
