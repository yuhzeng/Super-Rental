import { Component, OnInit } from '@angular/core';
import { BillService, AuthXService, EventService } from 'app/services/service-export';
import { IUserData } from 'app/models/user-model';
import { Bill } from 'app/models/bill';
import { PaymentOrchestratorService } from 'app/services/payment-orchestrator/payment-orchestrator.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // !# TODO: Delete SAV6VEIM2477EYBVOM2SXY3JG6JFKL734KKQRICCAQVMV57PC2KUMYH7 --> Testing only
  public _bill: Observable<Bill>;
  public bill: Bill;
  private user: IUserData;
  public dueDate: any;

  constructor(private _billService: BillService,
              private authX: AuthXService,
              private _pmtOrchService: PaymentOrchestratorService) {
                this.dueDate = 0;
              }

    ngOnInit() {
      this.authX.getCurrentUser().subscribe((user: IUserData) => {
        this.user = user;
        this._billService.getBillByUserID(user.uid)
          .subscribe(bill => {
            console.log(bill);
            this.bill = bill;
            this.dueDate = bill['dateDue']; });
      });
    }

    makePayment(_secretKey: string) {
      if (!this.bill ) { return alert('You have no balance due at the moment'); }
      if (!_secretKey) { return alert('Uh oh, looks like you didnt enter a secret key'); }
      const pmtObj = {
        userID: this.user.uid,
        apartmentID: this.bill.apartmentID,
        amount: this.bill.amount,
        datePaid: Date.now()
      };
      this._pmtOrchService.excutePaymentWithCron(_secretKey, pmtObj, this.bill)
        .then(() => {
          alert('Payment Success');
          return;
        })
        .catch(err => alert(err));
    }

    getTime (timestamp: any) {
      const date = new Date(0);
      date.setUTCSeconds(parseInt(timestamp['seconds'] || 0, 10));
      return date;
    }

}
