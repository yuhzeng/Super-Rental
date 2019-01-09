import { Component, OnInit } from '@angular/core';
import { AuthXService } from 'app/services/service-export';
import { LeaseService } from 'app/services/lease/lease.service';
import { IUserData } from 'app/models/user-model';
import { Tenant, LeaseRequest } from 'app/models/lease-request';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Amenity } from 'app/models/model-export';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {

  public userInfo: IUserData;
  public leasee: LeaseRequest;
  public apartmentID: string;
  public apartmentForm: FormGroup;
  public amenitiesForm: FormGroup;
  public leaseDetailsForm: FormGroup;
  public amenities: Amenity[];
  public amenitiesArray: Object[];
  public isDataAvailable = false;
  public status: string;
  public totalAmount: number;
  constructor(public authx: AuthXService, public ls: LeaseService,
    public fb: FormBuilder,
    public router: Router,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.apartmentForm = this.fb.group({
      aptID: [{value: '', disabled: true}, [Validators.required]]
    });

    this.amenitiesForm = this.fb.group({
      amntID: []
    });

    this.leaseDetailsForm = this.fb.group({
      uid: '' ,
      firstName: [{value: '' , disabled: true}, Validators.required],
      lastName: [{value: '' , disabled: true}, Validators.required],
      email: [{value: '' , disabled: true}, [Validators.required, Validators.email]],
      leaseInfo: this.fb.group({
        startDate: [{value: '' , disabled: true}, [Validators.required]],
        period: [{value: '' , disabled: true}, Validators.required],
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

    this.authx.getCurrentUser().subscribe(
      (user: IUserData) => {
        this.userInfo = user;
        console.log(user['lease_id']);
        if (user['lease_id'] !== 'na') {
          this.ls.getTenantByLeaseID(user['lease_id']).subscribe(
            (tenant: Tenant) => {
              this.ls.getLeaseRequestById(tenant['requestID']).subscribe(
                (leaseRequest: LeaseRequest) => {
                  // console.log(leaseRequest);
                  this.leasee = leaseRequest;
                  this.apartmentID = leaseRequest['aptID'];
                  // console.log(leaseRequest['aptID']);
                  this.isDataAvailable = true;
                  this.updateLease();
                  this.leaseAmount(leaseRequest['requestID']);
                  if (leaseRequest['status'] === 'ACCEPT' ) {
                    this.status = 'ACTIVE';
                  } else {
                    this.status = 'IN-ACTIVE';
                  }
                }
              );
            }
          );
        } else {
          this.ls.getLeaseRequestById(user['request_id']).subscribe(
            (leaseRequest: LeaseRequest) => {
              this.leasee = leaseRequest;
                  this.apartmentID = leaseRequest['aptID'];
                  // console.log(leaseRequest['aptID']);
                  this.isDataAvailable = true;
                  this.updateLease();
                  this.leaseAmount(leaseRequest['requestID']);
                  this.status = 'RECIEVED';
            }
          );
        }
      }
    );
  }

  private leaseAmount(leaseID: string) {
    this.ls.calulateLeaseAmount(leaseID).subscribe(
      (value) => {
        this.totalAmount = value;
      }
    );
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

  private updateLease(): void {
    // console.log(this.leasee['leaseID']);
    this.ls.getLeaseRequestById(this.leasee['requestID']).subscribe(
      (next: LeaseRequest) => {
        // console.log(next);
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

        // console.log(next.leaseInfo['startDate']['seconds']);
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

        const hello = next.leasee['otherLeasee'].map(
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
    } else {
      this.toastr.error('Please Verify all the Fields', 'Lease has been success', {
        timeOut: 2000
      });
    }
  }

  public goBack() {
      this.router.navigate(['client']);
  }

}
