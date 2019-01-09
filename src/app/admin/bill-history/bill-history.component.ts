import { Component, OnInit } from '@angular/core';
import { AuthXService, BillService } from 'app/services/service-export';
import { Observable } from 'rxjs';
import { IUserData } from 'app/models/user-model';
import { Bill } from '../../models/bill';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-statement',
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.css']
})
export class BillHistoryComponent implements OnInit {

  public _bills: Observable<Bill[]>;
  public billTotal: number;

  constructor(private _billService: BillService) { }

  ngOnInit() {
    this._bills = this._billService.getAllBills().pipe(
      map(bills => {
        this.billTotal = bills.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amount, 10), 0);
        return bills;
      })
    );
  }

}
