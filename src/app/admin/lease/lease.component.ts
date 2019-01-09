import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaseRequest } from 'app/models/lease-request';
import { Enquiry } from 'app/models/enquiry';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LeaseService } from 'app/services/lease/lease.service';


@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {

  public allCount: number;
  public displayedColumns: string[] = ['requestID', 'aptID', 'firstName', 'lastName', 'email', 'status'];
  public dataTable: MatTableDataSource<LeaseRequest>;
  public pendingCount: number;
  public completedCount: number;
  public leaseRequests: LeaseRequest[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ls: LeaseService) { }

  ngOnInit() {

    this.ls.getLeasePendingRequests().subscribe(
      (count) => {
        this.pendingCount = count.length;
      }
    );

    this.ls.getAllLeaseRequests().subscribe(
      (lease) => {
        this.leaseRequests = lease;
        this.allCount = lease.length;
        this.dataTable = new MatTableDataSource(this.leaseRequests);
        this.dataTable.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'email': return item.leasee['email'];
            case 'firstName': return item.leasee['firstName'];
            case 'lastName': return item.leasee['lastName'];
            default: return item[property];
          }
        };

        this.dataTable.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'leasee' ?
              currentTerm + data.leasee['firstName'] + data.leasee['lastName'] + data.leasee['email'] : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataTable.sort = this.sort;
        this.dataTable.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }
}
