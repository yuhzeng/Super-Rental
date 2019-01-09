import { Component, Input, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { LeaseService } from 'app/services/lease/lease.service';
import { Amenity } from 'app/models/amenity';
import { isUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lease-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesLeaseComponent implements OnInit  {
  @Input() amenitiesForm: FormGroup;
  @Input() amenitiesArray: Object[];
  @Input() amenities: Amenity[];
  public alert: boolean;
  // public amenitiesArray: Object[];
  constructor(private ls: LeaseService, public router: Router, private fb: FormBuilder) {
  }
   ngOnInit() {}
}
