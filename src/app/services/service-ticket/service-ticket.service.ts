import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServiceTicket } from '../../models/service-ticket';
import { refCount } from 'rxjs/operators';
import { LeaseService } from '../lease/lease.service';
import { MailService } from '../mail/mail.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceTicketService {

  private serviceTicketCollection: AngularFirestoreCollection<ServiceTicket>;

  constructor(private afs: AngularFirestore, private ls: LeaseService, private mail: MailService) {
    this.serviceTicketCollection = afs.collection<ServiceTicket>('service-ticket');
  }

  createNewServiceTicket(serviceTicket: ServiceTicket): Promise<void> {
      return this.serviceTicketCollection
        .doc(serviceTicket.serviceTicketID)
        .set(Object.assign({}, serviceTicket)).then(
          () => {
            this.ls.getLeaseRequestById(serviceTicket['requestID']).subscribe(
              (lr) => {
                this.mail.newLServiceRequestMail(lr, serviceTicket);
              }
            );
          }
        );
  }

  // By UserID
  getProgressServiceticketsByUserID(uid: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'Progress').where('userID', '==', uid);
      }).valueChanges();
  }

  getCompletedServiceticketsByUserID(uid: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'Completed').where('userID', '==', uid);
      }).valueChanges();
  }

  getServiceticketsByUserID(uid: string): Observable<ServiceTicket[]> {
    return this.afs.collection<ServiceTicket>('service-ticket', ref => {
      return ref.where('userID', '==', uid);
    }).valueChanges();
  }

  // By AptID - replace with [apartmentID] when apartmentID is available
  getProgressServiceticketsByAptID(aptid: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'PROGRESS').where('userID', '==', aptid);
      }).valueChanges();
  }

  getCompletedServiceticketsByAptID(aptid: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'COMPLETED').where('userID', '==', aptid);
      }).valueChanges();
  }

  getServiceticketsByAptID(aptid: string): Observable<ServiceTicket[]> {
    return this.afs.collection<ServiceTicket>('service-ticket', ref => {
      return ref.where('userID', '==', aptid).orderBy('dateCreated', 'desc');
    }).valueChanges();
  }
  // By leaseID - replace with [apartmentID] when apartmentID is available
  getProgressServiceticketsByLeaseID(lease_id: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'PROGRESS').where('leaseID', '==', lease_id);
      }).valueChanges();
  }

  getCompletedServiceticketsByLeaseID(lease_id: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'COMPLETED').where('leaseID', '==', lease_id);
      }).valueChanges();
  }

  getServiceticketsByLeaseID(lease_id: string): Observable<ServiceTicket[]> {
    return this.afs.collection<ServiceTicket>('service-ticket', ref => {
      return ref.where('leaseID', '==', lease_id).orderBy('dateCreated', 'desc');
    }).valueChanges();
  }

  getAllServiceTickets(): Observable<ServiceTicket[]> {
    return this.serviceTicketCollection
      .valueChanges();
  }

  getProgressServiceTickets(): Observable<ServiceTicket[]> {
    return this.afs.collection<ServiceTicket>('service-ticket', ref => {
      return ref.where('ticketStatus', '==', 'PROGRESS');
    }).valueChanges();
  }

  getOneServiceTicket(serviceTicketID: string): Observable<any> {
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .valueChanges();
  }

  updateServiceTicket(serviceTicketObj: any): Promise<void> {
    console.log(serviceTicketObj);
    const serviceTicketID = serviceTicketObj.serviceTicketID;
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .update(serviceTicketObj);
  }

  deleteServiceTicket(serviceTicketID: string): Promise<void> {
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .delete();
  }
}
