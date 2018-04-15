import { Component, OnInit } from '@angular/core';
import { ServiceRequestService } from "../../services/service-request.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoading = false;
  serviceRequestItems;

  constructor(
    private authService: AuthService,
    private serviceRequestService: ServiceRequestService
  ) { }

  getServiceRequestItems(){
    this.isLoading = true;
    this.serviceRequestService.getAllServiceRequestItems().subscribe(data => {
      this.serviceRequestItems = data['serviceRequestItems'];
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getServiceRequestItems();
  }

}
