import { Component, OnInit, Input } from '@angular/core';
import { LeaseService } from 'app/services/lease/lease.service';
import { Apartment } from 'app/models/apartment';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  @Input() aptID: string;
  public apartmentInfo: Apartment;
  constructor(private ls: LeaseService) {
    this.apartmentInfo = new Apartment();
  }

  ngOnInit() {
    this.ls.getApartmentbyID(this.aptID).subscribe(
      (apartmentInfo) => {
        this.apartmentInfo = apartmentInfo;
      }
    );
  }

}
