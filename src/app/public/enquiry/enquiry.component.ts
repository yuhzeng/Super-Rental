import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { EnquiryService } from 'app/services/service-export';
import { enquiryStatus } from 'app/models/enquiry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  public enquiry: FormGroup;
  private eid: string;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public afs: AngularFirestore,
    public enquiryS: EnquiryService) {
    this.eid = this.afs.createId();
  }
  ngOnInit() {
    this.enquiry = this.fb.group({
      enquiryID: this.eid,
      firstName: ['', [ Validators.required]],
      lastName: ['', [ Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: [''],
      message: ['', [Validators.required]],
      status: ['RECIEVED', [Validators.required]],
      recievedDate: new Date().toISOString()
    });
  }

  public enquire() {
    if (this.enquiry && this.enquiry.valid) {
        this.enquiryS.createNewEnquiry(this.enquiry.value);
        this.toastr.success('Enquiry has been succesfully submitted', 'Submitted', {
        timeOut: 2000
      });
      this.router.navigate(['']);
    } else {
      this.toastr.error('Failed to submit enquiry', 'Try once again', {
        timeOut: 2000
      });
    }
  }
}
