import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceTicketService, AuthXService } from 'app/services/service-export';
import { ServiceTicket } from 'app/models/model-export';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.component.html',
  styleUrls: ['./service-history.component.css']
})
export class ServiceHistoryComponent implements OnInit {

  public allCount: number;
  public completedCount: number;
  public pendingCount: number;
  public allRequests: ServiceTicket[];
  public displayedColumns: string[] = ['serviceTicketID', 'dateCreated', 'subject', 'ticketDescription', 'Status', 'dateResolved'];
  public dataTable: MatTableDataSource<ServiceTicket>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ticket: ServiceTicketService,
    private authX: AuthXService) { }

  ngOnInit() {
    this.ticket.getAllServiceTickets().subscribe(
      next => {
        this.allRequests = next;
        this.dataTable = new MatTableDataSource(next);
        this.dataTable.sort = this.sort;
        this.dataTable.paginator = this.paginator;
        this.allCount = next.length;
      },
      error => console.log(error)
    );

    this.ticket.getProgressServiceticketsByAptID(this.authX._currentUser.uid).subscribe(
      next => {
        this.pendingCount = next.length;
      },
      error => console.log(error)
    );

    this.ticket.getCompletedServiceticketsByAptID(this.authX._currentUser.uid).subscribe(
      next => {
        this.completedCount = next.length;
      },
      error => console.log(error)
    );
  }

  applyFilter(filterValue: string) {
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

}
