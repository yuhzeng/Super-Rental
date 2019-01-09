import { Component, OnInit, ViewChild } from '@angular/core';
import { Apartment } from 'app/models/apartment';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LeaseService } from 'app/services/lease/lease.service';
import { Amenity } from 'app/models/amenity';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {

  public allCount: number;
  public allAmenities: Amenity[];
  public displayedColumns: string[] = ['amntID', 'title', 'sub_title', 'description', 'price'];
  public dataTable: MatTableDataSource<Amenity>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ls: LeaseService) { }

  ngOnInit() {
    this.ls.getAmenities().subscribe(
      (amenities) => {
        this.allAmenities = amenities;
        this.dataTable = new MatTableDataSource(amenities);
        this.dataTable.sort = this.sort;
        this.dataTable.paginator = this.paginator;
        this.allCount = amenities.length;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

}
