import { Component, OnInit } from '@angular/core';
import { ServiceRequestService } from '../../services/service-request.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-approve-service-request',
  templateUrl: './approve-service-request.component.html',
  styleUrls: ['./approve-service-request.component.css']
})
export class ApproveServiceRequestComponent implements OnInit {
  isLoading = false;
  serviceRequests;

  constructor(
    private authService: AuthService,
    private serviceRequestService: ServiceRequestService,
    private flashMessagesService: FlashMessagesService
  ) {}

  getServiceRequest() {
    this.isLoading = true;
    this.serviceRequestService
      .getAllServiceRequestsForAdmin()
      .subscribe(data => {
        this.serviceRequests = data['serviceRequests'];
        this.isLoading = false;
      });
  }

  approveServiceRequest(id) {
    this.isLoading = true;
    this.serviceRequestService.approveServiceRequest(id).subscribe(data => {
      this.getServiceRequest();
      this.flashMessagesService.show(data['message'], {
        cssClass: 'snackbar',
        timeout: 3000
      });
    });
  }

  ngOnInit() {
    this.getServiceRequest();
  }
}
