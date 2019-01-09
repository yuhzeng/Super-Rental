// jshint ignore: start
/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Enquiry } from '../../models/enquiry';


@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private enquiryCollection: AngularFirestoreCollection<Enquiry>;

  constructor(private afs: AngularFirestore) { 
    this.enquiryCollection = afs.collection<Enquiry>('enquiry');
  }

  createNewEnquiry(enquiry: Enquiry): void {
      this.enquiryCollection
        .doc(enquiry.enquiryID)
        .set(enquiry);
  }

  getAllEnquirys(): Observable<Enquiry[]> {
    return this.enquiryCollection
      .valueChanges();
  }

  getPendingEnquiries(){
    return this.afs.collection<Enquiry>('enquiry', ref => {
      return ref.where('status', '==', 'RECIEVED');
    }).valueChanges();
  }

  getCompletedEnquiries(){
    return this.afs.collection<Enquiry>('enquiry', ref => {
      return ref.where('status', '==', 'COMPLETED');
    }).valueChanges();
  }

  getOneEnquiry(enquiryID: string): Observable<any> {
    return this.enquiryCollection
      .doc(enquiryID)
      .valueChanges();
  }

  updateEnquiry(enquiryObj: any): Promise<void> {
    const enquiryID = enquiryObj.enquiryID;
    return this.enquiryCollection
      .doc(enquiryID)
      .update(enquiryObj);
  }

  deleteEnquiry(enquiryID: string): Promise<void> {
    return this.enquiryCollection
      .doc(enquiryID)
      .delete();
  }
  
}