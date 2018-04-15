import { Component, OnInit } from '@angular/core';
import { ServiceRequestService } from "../../services/service-request.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  isLoading = false;
  serviceRequests;

  constructor(
    private authService: AuthService,
    private serviceRequestService: ServiceRequestService
  ) { }

  getServiceRequest(){
    this.isLoading = true;
    this.serviceRequestService.getAllServiceRequests().subscribe(data => {
      this.serviceRequests = data['serviceRequests'];
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getServiceRequest();
  }
}
