import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LeaseService } from 'app/services/lease/lease.service';
import { Router } from '@angular/router';
import { AuthXService } from 'app/services/service-export';

@Component({
  selector: 'app-lease-info',
  templateUrl: './lease-info.component.html',
  styleUrls: ['./lease-info.component.css']
})
export class LeaseInfoComponent implements OnInit {
  @Input() leaseDetailsForm: FormGroup;
  customerForm: FormGroup;
  constructor(private fb: FormBuilder, public router: Router, public authX: AuthXService) {
  }

  ngOnInit() {
    // Telescoping the function- instead of replacing the content.
    this.customerForm = this.leaseDetailsForm;
  }

  public getOtherLease(): FormArray {
    return <FormArray>this.customerForm.get('otherLeasee');
  }

  public setNotification(setValue: string) {
    const emailControl = this.customerForm.get('email');
    emailControl.setValidators([Validators.required]);
    emailControl.updateValueAndValidity();
  }

  public addLeasee(): void {
    this.getOtherLease().push(this.newSubLeasee());
  }

  public popLeasee(): void {
    if (this.getOtherLease().length > 0) {
      this.getOtherLease().removeAt(this.getOtherLease().length - 1);
    }
  }

  public newSubLeasee(): FormGroup {
    return this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [Validators.required, Validators.email] ]
    });
  }
}
