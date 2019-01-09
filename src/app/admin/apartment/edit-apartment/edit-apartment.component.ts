import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LeaseService } from 'app/services/lease/lease.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.css']
})
export class EditApartmentComponent implements OnInit {

  public apartmentData: FormGroup;
  public aptID: string;
  public newAptID: string;
  private routeID: string;
  constructor(private fb: FormBuilder,
      private router: Router,
      private routeParams: ActivatedRoute,
      private afs: AngularFirestore,
      private ls: LeaseService,
      private toastr: ToastrService) {
        this.newAptID = this.afs.createId();
      }

  ngOnInit() {
    this.apartmentData = this.fb.group({
      aptID: [this.newAptID, [Validators.required]],
      baths: ['', [Validators.max(8), Validators.min(1), Validators.required]],
      beds: ['', [Validators.max(8), Validators.min(1), Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      title: ['', [Validators.maxLength(50), Validators.required]],
      sub_title: ['', [Validators.maxLength(50), Validators.required]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', Validators.required]
    });

    this.routeParams.params.subscribe(
      (params) => {
        this.routeID = params['id'];
        if (params['id'] !== '0') {
          console.log(params['id']);
          this.aptID = params['id'];
          this.getApartmentData();
        }
      }
    );
  }

  private getApartmentData() {
    this.ls.getApartmentbyID(this.aptID).subscribe(
      (enquiry) => {
        console.log(enquiry);
        this.apartmentData.patchValue({
          aptID: enquiry.aptID,
          baths: enquiry.baths,
          beds: enquiry.beds,
          description: enquiry.description,
          title: enquiry.title,
          sub_title: enquiry.sub_title,
          type: enquiry.type,
          price: enquiry.price,
          image: enquiry.image
        });
      });
  }

  public onSubmitRequest() {
    if (this.apartmentData.valid) {
      console.log(this.apartmentData.value);
      this.ls.addApartment(this.apartmentData.value);
      this.router.navigate(['admin', 'apartment']);
      this.toastr.success('Succesfully Updated', 'Apartment', {
        timeOut: 2000
      });
    } else {
      this.toastr.error('Failed to Update, Verify all the fields', 'Apartment', {
        timeOut: 2000
      });
    }
  }

  public goBack() {
    this.router.navigate(['admin', 'apartment']);
  }
}
