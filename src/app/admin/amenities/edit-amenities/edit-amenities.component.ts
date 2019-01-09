import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LeaseService } from 'app/services/lease/lease.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-amenities',
  templateUrl: './edit-amenities.component.html',
  styleUrls: ['./edit-amenities.component.css']
})
export class EditAmenitiesComponent implements OnInit {

  public amenityData: FormGroup;
  public amntID: string;
  public newAmntID: string;
  private routeID: string;
  constructor(private fb: FormBuilder,
      private router: Router,
      private routeParams: ActivatedRoute,
      private afs: AngularFirestore,
      private ls: LeaseService,
      private toastr: ToastrService) {
        this.newAmntID = this.afs.createId();
      }

  ngOnInit() {
    this.amenityData = this.fb.group({
      amntID: [this.newAmntID, [Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      title: ['', [Validators.maxLength(50), Validators.required]],
      sub_title: ['', [Validators.maxLength(50), Validators.required]],
      price: ['', [Validators.required]],
      image: ['', Validators.required]
    });

    this.routeParams.params.subscribe(
      (params) => {
        this.routeID = params['id'];
        if (params['id'] !== '0') {
          console.log(params['id']);
          this.amntID = params['id'];
          this.getAmenityData();
        }
      }
    );
  }

  private getAmenityData() {
    this.ls.getAmenitybyID(this.amntID).subscribe(
      (enquiry) => {
        console.log(enquiry);
        this.amenityData.patchValue({
          amntID: enquiry.amntID,
          description: enquiry.description,
          title: enquiry.title,
          sub_title: enquiry.sub_title,
          price: enquiry.price,
          image: enquiry.image
        });
      });
  }

  public onSubmitRequest() {
    console.log(this.amenityData.value);
    if (this.amenityData.valid) {
      this.ls.addAmenity(this.amenityData.value);
      this.router.navigate(['admin', 'amenities']);
      this.toastr.success('Succesfully Updated', 'Amenity', {
        timeOut: 2000
      });
    } else {
      this.toastr.error('Failed to Update, Verify all the fields', 'Amenity', {
        timeOut: 2000
      });
    }
  }

  public goBack() {
    this.router.navigate(['admin', 'amenities']);
  }

}
