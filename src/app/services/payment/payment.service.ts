import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Payment } from '../../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // TODO: Need to nest under user/payments...

  private paymentCollection: AngularFirestoreCollection<Payment>;

  constructor(private afs: AngularFirestore) {
    this.paymentCollection = afs.collection('payments');
  }

  createNewPayment(paymentData: any): Promise<void> {
      const paymentID = this.afs.createId();
      paymentData.paymentID = paymentID;
      paymentData = <Payment> paymentData;
      return this.paymentCollection
        .doc(paymentID)
        .set(paymentData);
  }

  getAllPayments(): Observable<Payment[]> {
    return this.paymentCollection
      .valueChanges();
  }

  getUserPaymentHistory(userID: string): Observable<Payment[]> {
    return this.afs.collection<Payment>('payments', ref =>
      ref.where('userId', '==', userID))
      .valueChanges();
  }

  getOnePayment(paymentID: string): Observable<any> {
    return this.paymentCollection
      .doc(paymentID)
      .valueChanges();
  }

  updatePayment(paymentObj: any): Promise<void> {
    const paymentID = paymentObj.paymentID;
    return this.paymentCollection
      .doc(paymentID)
      .update(paymentObj);
  }

  markPaymentAsPaid(paymentID: string) {
    return this.paymentCollection
      .doc(paymentID)
      .update({
        paid: Date.now()
      });
  }

  deletePayment(paymentID: string): Promise<void> {
    return this.paymentCollection
      .doc(paymentID)
      .delete();
  }

}
