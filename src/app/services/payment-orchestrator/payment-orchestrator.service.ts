import { Injectable } from '@angular/core';
import { StellarService } from '../stellar/stellar.service';
import { PaymentService } from '../payment/payment.service';
import { BillService } from '../service-export';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrchestratorService {

  constructor(private _stellarService: StellarService,
              private _billService: BillService,
              private _paymentService: PaymentService,
              private afs: AngularFirestore) { }

  excutePayment(secretKey: string, paymentObj: any): Promise<string> {
    const { amount } = paymentObj;
    const _secretKey = secretKey || sessionStorage.getItem('seed_key');
    if (!_secretKey) { return Promise.reject('Please enter secret key'); }
    const pubKey = sessionStorage.getItem('public_key');
    console.log(pubKey);
    if (!pubKey || pubKey !== this._stellarService.getPublicKey(_secretKey)) {
      return Promise.reject('Your public key doesn\'t match your secret key');
    }
    return this._stellarService.validateNewBalance(pubKey, amount)
      .then((validBalance: boolean) => {
        if (validBalance) {
          const createPmtPromise = this._paymentService.createNewPayment(paymentObj);
          const sendStellarPmt = this._stellarService.sendPayment(amount, 'TODO: memo');
          return Promise.all([
              createPmtPromise,
              sendStellarPmt
          ])
          .then(res => 'EUREUKA!!!!!');
        } else {
          Promise.reject('invalid balance');
        }
      });
  }

  excutePaymentWithCron(secretKey: string, paymentObj: any, bill: any): Promise<string> {
    console.log(paymentObj);
    console.log(bill);
    const { amount } = paymentObj;
    const _secretKey = secretKey || sessionStorage.getItem('seed_key');
    if (!_secretKey) { return Promise.reject('Please enter secret key'); }
    const pubKey = this._stellarService.getPublicKey(_secretKey);
    if (!pubKey || pubKey === undefined || pubKey === null) {
      return Promise.reject('Your public key doesn\'t match your secret key');
    }
    const { userID } = bill; // to be deleted
    return this._stellarService.validateNewBalance(pubKey, amount)
      .then((validBalance: boolean) => {
        if (validBalance) {
          const createPmtPromise = this._paymentService.createNewPayment(paymentObj);
          const sendStellarPmt = this._stellarService.sendPayment(amount, 'TODO: memo');
          const updateStatementPromise = this._billService.moveBillToUserStatements(userID, bill);
          return Promise.all([
              createPmtPromise,
              sendStellarPmt,
              updateStatementPromise
          ])
          .then(() => {
              const nextBill = this._billService.createNextBill(bill);
              return this._billService.getBillRef(userID)
                .update({dateDue: nextBill.dateDue})
                .then(() => 'success');
          })
          .then(res => 'EUREUKA!!!!!');
        } else {
          Promise.reject('invalid balance');
        }
      });
  }

}
