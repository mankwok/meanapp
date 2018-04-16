import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ServiceRequestService } from '../../services/service-request.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-service-request-item',
  templateUrl: './edit-service-request-item.component.html',
  styleUrls: ['./edit-service-request-item.component.css']
})
export class EditServiceRequestItemComponent implements OnInit {
  serviceRequestItem;
  form;
  errorMessage;
  processing = false;
  editError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private serviceRequestService: ServiceRequestService,
    private flashMessagesService: FlashMessagesService
  ) { this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      stock: [1, Validators.required]
    });
  }

  disableForm() {
    this.form.controls['stock'].disable();
  }

  enableForm() {
    this.form.controls['stock'].enable();
  }
  onEdit(){
    this.processing = true;
    this.editError = false;
    this.disableForm();
    let serviceRequestItemID = this.serviceRequestItem._id;
    let stock = this.form.get('stock').value;
    console.log(stock);
    this.serviceRequestService.setServicetRequestItemStock(serviceRequestItemID, stock).subscribe(data => {
      this.processing = false;
      if (!data['success']) {
        this.editError = true;
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
    this.serviceRequestItem = this.activatedRoute.snapshot.data['requestItemResolve'].serviceRequestItem;
    this.form.controls['stock'].patchValue(this.serviceRequestItem.stock);
  }

}
