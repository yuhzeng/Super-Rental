import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EnquiryService } from 'app/services/service-export';
import { Enquiry } from 'app/models/enquiry';

@Component({
  selector: 'app-enquiry-history',
  templateUrl: './enquiry-history.component.html',
  styleUrls: ['./enquiry-history.component.css']
})
export class EnquiryHistoryComponent implements OnInit {

  public allEnquiries: Enquiry[];
  public displayedColumns: string[] = ['enquiryID', 'recievedDate', 'firstName', 'lastName',
   'message', 'email', 'contact', 'status', 'resolvedDate'];
  public dataTable: MatTableDataSource<Enquiry>;
  public allCount: number;
  public pendingCount: number;
  public completedCount: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private enquiryS: EnquiryService) { }

  ngOnInit() {
    this.enquiryS.getAllEnquirys().subscribe(
      (enquiries) => {
        this.allEnquiries = enquiries;
        this.dataTable = new MatTableDataSource(this.allEnquiries);
        this.dataTable.sort = this.sort;
        this.dataTable.paginator = this.paginator;
        this.allCount = enquiries.length;
      }
    );

    this.enquiryS.getCompletedEnquiries().subscribe(
      (completed) => {
        this.completedCount = completed.length;
    });

    this.enquiryS.getPendingEnquiries().subscribe(
      (pending) => {
        this.pendingCount = pending.length;
    });
  }

  applyFilter(filterValue: string) {
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

}
