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
  selector: 'app-create-service-request-item',
  templateUrl: './create-service-request-item.component.html',
  styleUrls: ['./create-service-request-item.component.css']
})
export class CreateServiceRequestItemComponent implements OnInit {

  form;
  errorMessage;
  processing = false;
  createError = false;
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
      name: ['', Validators.required],
      stock: [1, Validators.required]
    });
  }

  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['stock'].disable();
  }

  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['stock'].enable();
  }

  onItemSubmit() {
    this.processing = true;
    this.createError = false;
    this.disableForm();
    const serviceRequestItem = {
      requestType: 'M',
      name: this.form.get('name').value,
      stock: this.form.get('stock').value,
    };
    this.serviceRequestService.newServiceRequestItem(serviceRequestItem).subscribe(data => {
      this.processing = false;
      if (!data['success']) {
        this.createError = true;
        this.errorMessage = data['message'];
        this.enableForm();
      } else {
        this.flashMessagesService.show(data['message'], {
          cssClass: 'snackbar',
          timeout: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/service-request/dashboard']);
        }, 3000);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {

  }

}
