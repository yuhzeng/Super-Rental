// jshint ignore: start
/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Bill } from '../../models/bill';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  private billCollection: AngularFirestoreCollection<Bill>;

  constructor(private afs: AngularFirestore) { 
    this.billCollection = afs.collection<Bill>('bills');
  }

  private createNextBillID(): string {
    const billID = this.afs.createId();
    return billID;
  }

  private calculateNextBillDate(oldBillDateString) {
      console.log(oldBillDateString);
      const oldBillDate = new Date(oldBillDateString);
      const nextBillMonth = oldBillDate.getMonth() + 1;
      oldBillDate.setMonth(nextBillMonth);
      return new Date(oldBillDate).toLocaleDateString("en-US");
  }

  public createNewBill(data: Bill): Promise<void> { 
    console.log(data);
    const billID = this.afs.createId();
    data.billID = billID;
    return this.billCollection
      .doc(data['userID'])
      .set(Object.assign({}, data));
  }

  getBillRef(billID: string) {
    console.log(billID, ' getBillRef');
    return this.billCollection
      .doc(billID)
      .ref;
  }

  createNextBill(nextBill: any) {
      const billID = this.createNextBillID();
      nextBill.billID = billID;
      const nextBillDate = this.calculateNextBillDate(nextBill.dateDue);
      nextBill.dateDue = nextBillDate;
      return nextBill;
  }

  getAllBills(): Observable<Bill[]> {
    return this.billCollection
      .valueChanges();
  }

  getBillByUserID(userID: string): Observable<Bill> {
    return this.billCollection
      .doc<Bill>(userID)
      .valueChanges();
  }
  
  getOneBill(billID: string): Observable<any> {
    return this.billCollection
      .doc(billID)
      .valueChanges();
  }

  updateBill(billObj: any): Promise<void> {
    const billID = billObj.billID;
    return this.billCollection
      .doc(billID)
      .update(billObj);
  }

  deleteBill(billID: string): Promise<void> {
    return this.billCollection
      .doc(billID)
      .delete();
  }

  moveBillToUserStatements(userId: string, bill: any) {
    // const batch = this.afs.firestore.batch();
    const newID = this.afs.createId();
    bill.id = newID;
    return this.afs.collection('statements')
      .doc(userId)
      .collection('userStatements')
      .doc(newID)
      .set(bill);
  }

}