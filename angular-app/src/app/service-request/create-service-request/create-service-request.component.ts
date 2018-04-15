import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ServiceRequestService } from '../../services/service-request.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create-service-request',
  templateUrl: './create-service-request.component.html',
  styleUrls: ['./create-service-request.component.css']
})
export class CreateServiceRequestComponent implements OnInit {
  form;
  username;
  errorMessage;
  processing = false;
  postError = false;
  serviceRequestItems;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private serviceRequestService: ServiceRequestService,
    private flashMessagesService: FlashMessagesService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      requestItem: ['', Validators.required],
      requestDesc: ['', Validators.required],
      quantity: [1, Validators.required]
    });
  }

  disableForm() {
    this.form.controls['requestItem'].disable();
    this.form.controls['requestDesc'].disable();
    this.form.controls['quantity'].disable();
  }

  enableForm() {
    this.form.controls['requestItem'].enable();
    this.form.controls['requestDesc'].enable();
    this.form.controls['quantity'].enable();
  }

  onServiceRequestSubmit() {
    this.processing = true;
    this.postError = false;
    this.disableForm();
    const serviceRequest = {
      requestItem: this.form.get('requestItem').value,
      requestDesc: this.form.get('requestDesc').value,
      quantity: this.form.get('quantity').value
    };
    this.serviceRequestService
      .newServiceRequest(serviceRequest)
      .subscribe(data => {
        this.processing = false;
        if (!data['success']) {
          this.postError = true;
          this.errorMessage = data['message'];
          this.enableForm();
        } else {
          this.flashMessagesService.show(data['message'], {
            cssClass: 'snackbar',
            timeout: 3000
          });
          setTimeout(() => {
            this.router.navigate(['/service-request']);
          }, 3000);
        }
      });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.serviceRequestService.getAllServiceRequestItems().subscribe(data => {
      if (data['success']) {
        this.serviceRequestItems = data['serviceRequestItems'];
        console.log(this.serviceRequestItems);
      }
    });
  }
}
