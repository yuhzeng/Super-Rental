import { Component, OnInit, Input } from '@angular/core';
import { LeaseService } from 'app/services/lease/lease.service';
import { Apartment } from 'app/models/apartment';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lease-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentEditComponent  {
  @Input() apartmentForm: FormGroup;
  public apartments: Apartment[];
  public apartment: any;
  public alert: boolean;

  constructor(private ls: LeaseService, private router: Router) {
    this.ls.getApartments().subscribe(
      next => {
        this.apartments = next;
      },
      error => console.log(error)
    );
  }

  public apartmentSubmit(apartmentID: NgForm) {
    // Fill the data and route to next page [Amenities]
    if (apartmentID && apartmentID.valid) {
      this.ls.setLeaseAptID(Object.values(apartmentID.value).toString());
      this.alert = false;
      this.router.navigate(['/lease/amenities']);
    }
    this.alert = true;
  }
}
