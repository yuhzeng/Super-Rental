import { Component, OnInit } from '@angular/core';
import { AuthXService } from 'app/services/service-export';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LeaseService } from 'app/services/lease/lease.service';
import { Amenity } from 'app/models/amenity';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeaseRequestStatus } from 'app/models/lease-request';
import { MailService } from 'app/services/mail/mail.service';
import { IUserData } from 'app/models/user-model';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {

  public apartmentForm: FormGroup;
  public amenitiesForm: FormGroup;
  public leaseDetailsForm: FormGroup;
  public amenitiesArray: Object[];
  public amenities: Amenity[];


  constructor(private authX: AuthXService,
              private fb: FormBuilder,
              private ls: LeaseService,
              private router: Router,
              private toastr: ToastrService,
              private mail: MailService) {
   }

  ngOnInit() {
    this.authX.getCurrentUser().subscribe(
      (user: IUserData) => {
        if (user['request_id']) {
          this.router.navigate(['client']);
        }
      }
    );
    this.apartmentForm = this.fb.group({
      aptID: ['', [Validators.required]]
    });

    this.amenitiesForm = this.fb.group({
      amntID: []
    });

    this.leaseDetailsForm = this.fb.group({
      uid: this.authX._currentUser.uid ,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [ Validators.email]],
      emailDisable: [{value: '', disabled: true}, [Validators.email]],
      leaseInfo: this.fb.group({
        'startDate': ['', [Validators.required]],
        'period': ['', Validators.required],
      }),
      otherLeasee: this.fb.array([])
    });

    this.ls.getAmenities().subscribe(
      next => {
        this.amenities = next;
        this.amenitiesArray = this.addAmenitiesControl().controls;
      },
      error => {
        console.warn(error);
      }
    );
  }

  private addAmenitiesControl() {
    const amentiesArr = this.amenities.map(
      () => {
        return this.fb.control(false);
      });

      // console.log(amentiesArr);
     this.amenitiesForm.patchValue({
       amntID: this.fb.array(amentiesArr)
     });

     return <FormArray>this.amenitiesForm.get('amntID').value;
  }

  public onLeaseSubmit(): void {
    if (this.apartmentForm.valid && this.amenitiesForm.valid && this.leaseDetailsForm.valid) {
      const amenitiesSelected = this.amenitiesForm.get('amntID').value.value;
      const consAmenityID = new Array<string>();

      amenitiesSelected.forEach(
        (arrayElement, index) => {
          if (arrayElement) {
            consAmenityID.push(this.amenities[index].amntID);
          }
        }
      );
      this.ls.setLeaseAptID(this.apartmentForm.get('aptID').value);
      this.ls.setLeaseAmenities(consAmenityID);
      this.ls.setUserDetails(this.leaseDetailsForm.value);
      // Always at the end call this - Refactoring required
      this.ls.pushRequest(LeaseRequestStatus.RECIEVED);
      this.mail.newLeaseRequestMail(this.ls.leaseInfo);
      this.toastr.success('Submitted', 'Lease Request', {
        timeOut: 2000
      });
      this.router.navigate(['client']);
    } else {
      this.toastr.error('Please Verify all the Fields', 'Lease Request', {
        timeOut: 2000
      });
    }
  }
}
