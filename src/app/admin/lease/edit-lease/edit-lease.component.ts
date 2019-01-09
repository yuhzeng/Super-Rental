import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AuthXService } from 'app/services/service-export';
import { LeaseService } from 'app/services/lease/lease.service';
import { Amenity } from 'app/models/amenity';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaseRequest, LeaseRequestStatus } from 'app/models/lease-request';
import { materialize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-lease',
  templateUrl: './edit-lease.component.html',
  styleUrls: ['./edit-lease.component.css']
})
export class EditLeaseComponent implements OnInit {

  public apartmentForm: FormGroup;
  public amenitiesForm: FormGroup;
  public leaseDetailsForm: FormGroup;
  public amenities: Amenity[];
  public amenitiesArray: Object[];
  public leaseID: string;
  public status: string;
  public buttonDisplay: boolean;
  public leaseRequestStatus: LeaseRequestStatus;
  public totalAmount: number;
  constructor(private fb: FormBuilder,
              private routeParams: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private authX: AuthXService,
              private ls: LeaseService) { }

  ngOnInit() {

    if (this.router.url.indexOf('/lease') > 0) {
      this.buttonDisplay = true;
    } else {
      this.buttonDisplay = false;
    }
    this.apartmentForm = this.fb.group({
      aptID: [{value: ''}, [Validators.required]]
    });

    this.amenitiesForm = this.fb.group({
      amntID: []
    });

    this.leaseDetailsForm = this.fb.group({
      uid: '' ,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      leaseInfo: this.fb.group({
        startDate: ['', [Validators.required]],
        period: ['', Validators.required],
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

    this.routeParams.params.subscribe(
      (params) => {
        if (params['id'] !== '0') {
          console.log(params['id']);
          this.leaseID = params['id'];
          this.updateLease();
          this.leaseAmount(params['id']);
        }
      });
  }

  private leaseAmount(leaseID: string) {
    this.ls.calulateLeaseAmount(leaseID).subscribe(
      (value) => {
        this.totalAmount = value;
      }
    );
  }

  private updateLease(): void {
    this.ls.getLeaseRequestById(this.leaseID).subscribe(
      (next: LeaseRequest) => {

        if (next['status'] === 'ACCEPT' ) {
          this.status = 'ACTIVE';
        } else {
          this.status = next['status'];
        }
        // this.status = next['status'];
        this.apartmentForm.patchValue({
          aptID: next['aptID'] || ''
        });

        this.updateAmenities(next['amenities']).then(
          (data) => {
            this.amenitiesForm.patchValue({
              amntID: this.fb.array(<FormControl[]>data)
            });
            this.amenitiesArray = (<FormArray>this.amenitiesForm.get('amntID').value).controls;
          }
        );

        console.log(next.leaseInfo['startDate']['seconds']);
        const date = new Date(0);
        date.setUTCSeconds(next.leaseInfo['startDate']['seconds']);
        this.leaseDetailsForm.patchValue({
          uid: next.leasee['uid'] ,
          firstName: next.leasee['firstName'],
          lastName: next.leasee['lastName'],
          email: next.leasee['email'],
          leaseInfo: {
            startDate: date.toISOString().substring(0, 10),
            period: next.leaseInfo['period'],
          },
          otherLeasee: []
        });

        next.leasee['otherLeasee'].map(
          (value, index) => {
            // console.log(JSON.stringify(value) + ' ' + index);
            return (<FormArray>this.leaseDetailsForm.get('otherLeasee')).push(this.fb.group({
              firstName: value['firstName'],
              lastName: value['lastName'],
              email: value['email']
          }));

          }
        );
      }
    );
  }

  public updateAmenities(amenitiesList: string[]) {
    const amenities = [];
    return new Promise(resolve => {
      this.ls.getAmenities().subscribe(
        (next) => {
          next.filter(
            (value) => {
              if (amenitiesList.indexOf(value['amntID']) < 0) {
                amenities.push(this.fb.control(false));
              } else {
                amenities.push(this.fb.control(true));
              }
            }
          );
          resolve(amenities);
        }
      );
    });
  }

  private addAmenitiesControl() {
    const amentiesArr = this.amenities.map(
      () => {
        return this.fb.control(false);
      });
     this.amenitiesForm.patchValue({
       'amntID': this.fb.array(amentiesArr)
     });

     return <FormArray>this.amenitiesForm.get('amntID').value;
  }

  public onLeaseSubmit(status: any): void {
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
      this.ls.setLeaseRequestID(this.leaseID);
      this.ls.setLeaseAptID(this.apartmentForm.get('aptID').value);
      this.ls.setLeaseAmenities(consAmenityID);
      // Bugfix for date
      this.leaseDetailsForm.value.leaseInfo.startDate = new Date(this.leaseDetailsForm.value.leaseInfo.startDate);
      this.ls.setUserDetails(this.leaseDetailsForm.value);
      // Always at the end call this - Refactoring required
      this.ls.pushRequest(status);
      this.toastr.success(status, 'Lease Request', {
        timeOut: 2000
      });
      if (this.buttonDisplay) {
        this.router.navigate(['admin', 'lease']);
      } else {
        this.router.navigate(['admin', 'clients']);
      }
    } else {
      this.toastr.error('Please Verify all the Fields', 'Update Failed', {
        timeOut: 2000
      });
    }
  }

  public goBack() {
    if (this.buttonDisplay) {
      this.router.navigate(['admin', 'lease']);
    } else {
      this.router.navigate(['admin', 'clients']);
    }
  }

}
