import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceTicket } from 'app/models/model-export';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Apartment } from 'app/models/apartment';
import { LeaseService } from 'app/services/lease/lease.service';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {

  public allCount: number;
  public allApartments: Apartment[];
  public displayedColumns: string[] = ['aptID', 'title', 'sub_title', 'type', 'description', 'baths'
                                    , 'beds', 'price'];
  public dataTable: MatTableDataSource<Apartment>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ls: LeaseService) { }

  ngOnInit() {
    this.ls.getApartments().subscribe(
      (apartment) => {
        this.allApartments = apartment;
        this.dataTable = new MatTableDataSource(apartment);
        this.dataTable.sort = this.sort;
        this.dataTable.paginator = this.paginator;
        this.allCount = apartment.length;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

}
