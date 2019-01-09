import { Component, OnInit } from '@angular/core';
import { AuthXService, StatementService } from 'app/services/service-export';
import { Observable } from 'rxjs';
import { IUserData } from 'app/models/user-model';
import { Statement } from '../../models/statement';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  public _statements: Observable<Statement[]>;

  constructor(private _statementService: StatementService,
              private authX: AuthXService) { }

  ngOnInit() {
    this.authX.getCurrentUser().subscribe((user: IUserData) => {
      this._statements = this._statementService.getStatementsByUserID(user.uid);
    });
  }

}
