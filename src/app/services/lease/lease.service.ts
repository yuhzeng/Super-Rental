import { Injectable } from '@angular/core';
import { Apartment } from 'app/models/apartment';
import { Amenity } from 'app/models/amenity';
import { LeaseRequest, LeaseUserData, LeaseRequestStatus, Tenant } from 'app/models/lease-request';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LeaseWorkflowService } from '../lease-workflow/lease-workflow.service';
import { IUserData, IUser } from 'app/models/user-model';
import { BillService } from '../bill/bill.service';
import { Bill } from 'app/models/bill';
import { timeout } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  // Amenities Data
  private amenitiesData: Observable<Amenity[]>;
  public apartmentsCollection: AngularFirestoreCollection<Apartment>;
  public amenitiesCollection: AngularFirestoreCollection<Amenity>;
  public leaseRequestCollection: AngularFirestoreCollection<LeaseRequest>;
  // New Lease
  public leaseInfo: LeaseRequest = new LeaseRequest();
  public leaseValue: number;

  constructor(private db: AngularFirestore, private wf: LeaseWorkflowService, private bill: BillService) {
    this.apartmentsCollection = this.db.collection<Apartment>('Apartments');
    this.amenitiesCollection = this.db.collection<Amenity>('Amenities');
    this.leaseRequestCollection =  this.db.collection<LeaseRequest>('lease-requests');
  }

  private getUserData(userID: string) {
    return this.db.collection<IUserData>('User').doc(userID).valueChanges();
  }

  private updateUserData(data: IUserData) {
    return this.db.collection<IUserData>('User').doc(data['uid']).set(data);
  }
  // New Lease -[START]
  public setLeaseAptID(aptID: string): void {
      console.log(JSON.stringify(this.leaseInfo));
      this.leaseInfo.setApartmentID(aptID);
      this.wf.validate('apartment');
  }

  public setLeaseAmenities(amenities: string[]): void {
    this.leaseInfo.setAmenities(amenities);
    console.log(this.leaseInfo);
  }
  // New Lease -[END]

  // Data Retrieval - Firebase [START]
  public getApartments(): Observable<Apartment[]> {
    return this.apartmentsCollection.valueChanges();
  }

  public getApartmentbyID(aptID: string): Observable<any> {
    return this.apartmentsCollection.doc(aptID).valueChanges();
  }

  public getAmenities(): Observable<Amenity[]> {
    return this.amenitiesCollection.valueChanges();
  }

  public getAmenitybyID(amntID: string): Observable<any> {
    return this.amenitiesCollection.doc(amntID).valueChanges();
  }

  public pushRequest(status: LeaseRequestStatus) {
    if ( this.leaseInfo['requestID'] === undefined) {
      this.leaseInfo['requestID'] = this.db.createId();
    }
    this.leaseInfo['status'] = status;
     if (status === 'ACCEPT') {
       if (this.leaseInfo['leaseID'] === undefined) {
        this.leaseInfo['leaseID'] = this.db.createId();
        const tf = new Tenant({
          'leaseID': this.leaseInfo['leaseID'],
          'requestID': this.leaseInfo['requestID'],
          'aptID' : this.leaseInfo['aptID'],
          'uid' : this.leaseInfo['leasee']['uid']
        });
        this.db.collection<Tenant>('tenants').doc(this.leaseInfo['leaseID']).set(Object.assign({}, tf));
        this.getUserData(this.leaseInfo.leasee['uid']).subscribe(
          (userInfo: IUserData) => {
            userInfo['apt_id'] = this.leaseInfo['aptID'];
            userInfo['lease_id'] = this.leaseInfo['leaseID'];
            userInfo['request_id'] = this.leaseInfo['requestID'];
            this.updateUserData(userInfo);
            this.calulateLeaseAmount(this.leaseInfo['requestID']).pipe(timeout(300)).subscribe(
              (value) => {
                // console.log(value);
                this.leaseValue = value;
              },
              err => {
                if (err['name'] === 'TimeoutError') {
                  const dueDate = new Date();
                  dueDate.setDate(dueDate.getDate() + 10);
                  this.bill.createNewBill(new Bill({
                    billID: '',
                    userID: this.leaseInfo['leasee']['uid'],
                    leaseID: this.leaseInfo['leaseID'],
                    requestID: this.leaseInfo['requestID'],
                    apartmentID: this.leaseInfo['aptID'],
                    amount: this.leaseValue,
                    dateDue: dueDate,
                    datePaid: 'na'
                  }));
                }
              },
              () => {
                console.log('Activity Completed');
              }
            );
          }
        );
       }

     }
     if (status === 'REJECT') {
      if (this.leaseInfo['leaseID'] !== undefined) {
        this.db.collection<Tenant>('tenants').doc(this.leaseInfo['leaseID']).delete();
        this.leaseInfo['leaseID'] = 'na';
      }
     }
     if (status === 'RECIEVED') {
        this.getUserData(this.leaseInfo.leasee['uid']).subscribe(
          (userInfo: IUserData) => {
            userInfo['lease_id'] = this.leaseInfo['leaseID'] || 'na';
            userInfo['request_id'] = this.leaseInfo['requestID'];
            userInfo['first_name'] = this.leaseInfo['leasee']['firstName'];
            userInfo['last_name'] = this.leaseInfo['leasee']['lastName'];
            this.updateUserData(userInfo);
        }
      );

     }
    //  console.log(this.leaseInfo);
    this.leaseRequestCollection.doc(this.leaseInfo['requestID']).set(Object.assign({}, this.leaseInfo));
  }

  public setUserDetails(userInfo: LeaseUserData) {
    const leasePeriod = userInfo['leaseInfo'];
    const endDate = new Date(leasePeriod['startDate']);
    endDate.setMonth(endDate.getMonth() + parseInt(leasePeriod['period'] , 10));
    leasePeriod['endDate'] = endDate;
    this.leaseInfo.setLeaseInfo(leasePeriod);
    delete userInfo['leaseInfo'];
    this.leaseInfo.setLeaseData(userInfo);
  }

  public setLeaseRequestID(requestID: string) {
    this.leaseInfo.requestID = requestID;
  }

  public addApartment(apt: Apartment) {
    return this.apartmentsCollection
                .doc(apt.aptID)
                .set(apt);
  }

  public updateApartment(apt: Apartment) {
    return this.apartmentsCollection
                .doc(apt.aptID)
                .update(apt);
  }

  public deleteApartment(apt: Apartment) {
    return this.apartmentsCollection
                .doc(apt.aptID)
                .delete();
  }

  public addAmenity(amt: Amenity) {
    return this.amenitiesCollection
                .doc(amt.amntID)
                .set(amt);
  }

  public updateAmenity(amt: Amenity) {
    return this.amenitiesCollection
                .doc(amt.amntID)
                .update(amt);
  }

  public deleteAmenity(amt: Amenity) {
    return this.amenitiesCollection
                .doc(amt.amntID)
                .delete();
  }

  // Except Accepted
  public getAllLeaseRequests():  Observable<LeaseRequest[]> {
    return this.db.collection<LeaseRequest>('lease-requests', ref => {
      return ref.where('status', '>', 'ACCEPT');
    }).valueChanges();
  }


  public getLeaseRequestById(requestID: string): Observable<any> {
    return this.db.collection<LeaseRequest>('lease-requests').doc(requestID).valueChanges();
  }

  public updateLeaseRequests(leaseRequest: LeaseRequest) {
    this.db.collection<LeaseRequest>('lease-requests').doc(leaseRequest.requestID).valueChanges();
  }

  public getLeasePendingRequests(): Observable<LeaseRequest[]> {
    return this.db.collection<LeaseRequest>('lease-requests', ref => {
      return ref.where('status', '==', 'RECIEVED');
    }).valueChanges();
  }

  public calulateLeaseAmount(requestID: string): Observable<any> {
    let price = 0;
    return Observable.create(
      (observer) => {
        this.getLeaseRequestById(requestID).pipe().subscribe(
          (leasee: LeaseRequest) => {
            const amenities = leasee['amenities'];
            const apartment = leasee['aptID'];

            this.getApartmentbyID(apartment).subscribe(
              (apart) => {
                price += parseInt(apart['price'], 10);
                for ( const amenity of amenities) {
                  if (amenity) {
                    this.getAmenitybyID(amenity).subscribe(
                      (amen: Amenity) => {
                        price  += parseInt(amen['price'], 10);
                        observer.next(price);
                      },
                      (error) => console.log(error),
                      () => console.log('amenities done')
                    );
                  }
                }
              },
              (error) => console.log(error),
              () => console.log('apartments done')
            );
          }
        );
      }
    );
  }

  public getAllTenants():  Observable<LeaseRequest[]>  {
    return this.db.collection<LeaseRequest>('lease-requests', ref => {
      return ref.where('status', '==', 'ACCEPT');
    }).valueChanges();
  }

  public getTenantByLeaseID(leaseID: string) {
     return this.db.collection('tenants').doc(leaseID).valueChanges();
  }

}
