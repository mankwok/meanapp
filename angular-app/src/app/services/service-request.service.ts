import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class ServiceRequestService {
  httpOptions;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: HttpClient) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.authService.token
      })
    };
  }

  newServiceRequest(serviceRequest) {
    this.createAuthenticationHeaders();
    return this.http.post(
      this.domain + 'serviceRequests/newServiceRequest',
      serviceRequest,
      this.httpOptions
    );
  }

  newServiceRequestItem(serviceRequestItem) {
    this.createAuthenticationHeaders();
    return this.http.post(
      this.domain + 'serviceRequests/newServiceRequestItem',
      serviceRequestItem,
      this.httpOptions
    );
  }

  getServiceRequestItem(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'serviceRequests/requestItem/' + id, this.httpOptions);
  }

  getAllServiceRequests() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'serviceRequests/all', this.httpOptions);
  }

  getAllServiceRequestsForAdmin() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'serviceRequests/allForAdmin', this.httpOptions);
  }

  getAllServiceRequestItems() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'serviceRequests/requestItems', this.httpOptions);
  }

  approveServiceRequest(id) {
    this.createAuthenticationHeaders();
    const serviceRequest = {
      id: id
    };
    return this.http.put(this.domain + 'serviceRequests/approveServiceRequest', serviceRequest, this.httpOptions);
  }

  setServicetRequestItemStock(itemID, stock) {
    this.createAuthenticationHeaders();
    const editRequest = {
      id: itemID,
      stock: stock
    };
    return this.http.put(this.domain + 'serviceRequests/setRequestItemStock', editRequest, this.httpOptions);
  }
  
}
