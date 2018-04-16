import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ServiceRequestService } from './service-request.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RequestItemResolveService implements Resolve<any> {

  constructor(
    private serviceRequestService: ServiceRequestService,
    private router: Router,
  ) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.serviceRequestService.getServiceRequestItem(route.paramMap.get('id')).catch(err => {
      this.router.navigate(["/service-request/dashboard"]);
      return Observable.empty();
    });;
  }
}
