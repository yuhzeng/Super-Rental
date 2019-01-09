import { Component, OnInit } from '@angular/core';
import { EnquiryService } from 'app/services/service-export';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry, enquiryStatus } from 'app/models/enquiry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public enquiryID: string;
  public enquiryDetails: Enquiry;
  public statusUpdate: FormGroup;
  public status = enquiryStatus;
  public keys: any;
  constructor(private enquiryS: EnquiryService, private routeParams: ActivatedRoute,
     private fb: FormBuilder,
     private toastr: ToastrService,
     private router: Router) {
       this.keys = Object.keys(this.status);
  }

  ngOnInit() {
    this.routeParams.params.subscribe(
      (params) => {
        this.enquiryID = params['id'];
        this.getEnquiry();
      }
    );
    this.statusUpdate = this.fb.group({
      resolvedDate: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  private getEnquiry() {
    this.enquiryS.getOneEnquiry(this.enquiryID).subscribe(
      (enquiry) => {
        this.enquiryDetails = enquiry;
        console.log(this.enquiryDetails);
        this.statusUpdate.patchValue({
          resolvedDate: enquiry.resolvedDate || '',
          status: enquiry.status || 'PROGRESS'
        });
      }
    );
  }

  public onSubmitRequest() {
    console.log(this.statusUpdate.value);
    if (this.statusUpdate.valid) {
      this.enquiryDetails['resolvedDate'] = new Date(this.statusUpdate.value['resolvedDate']).toISOString();
      this.enquiryDetails['status'] = this.statusUpdate.value['status'];
      this.enquiryS.updateEnquiry(this.enquiryDetails);
      this.router.navigate(['admin', 'enquiry']);
      this.toastr.success('Succesfully Updated', 'Service Ticket', {
        timeOut: 2000
      });
    } else {
      this.toastr.error('Failed to Update, Verify all the fields', 'Service Ticket', {
        timeOut: 2000
      });
    }
  }

  public goBack() {
    this.router.navigate(['admin', 'enquiry']);
  }

}
