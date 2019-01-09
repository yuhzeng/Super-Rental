import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceTicketService } from 'app/services/service-export';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enquiryStatus } from 'app/models/enquiry';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  public serviceTicket: FormGroup;
  public keys: any;
  public status = enquiryStatus;


  constructor(private router: Router,
    private routeParams: ActivatedRoute,
    private service: ServiceTicketService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.keys = Object.keys(this.status);
    }
  private serviceId: any;
  ngOnInit() {
    this.serviceTicket = this.fb.group({
      serviceTicketID: [{value: '',
                  disabled: false}, [Validators.required]],
      leaseID: [{value: '',
                  disabled: false}, [Validators.required]],
      userID: [{value: '',
                  disabled: false}, [Validators.required]],
      apartmentID: [{value: '',
                  disabled: false}, [Validators.required]],
      subject: [{value: '',
                  disabled: false}, [Validators.required]],
      ticketDescription: [{value: '',
                  disabled: false}, [Validators.required]],
      permission: [{value: '',
                  disabled: false}, [Validators.required]],
      pets: [{value: '',
                  disabled: false}, [Validators.required]],
      security: [{value: '',
                  disabled: false}, [Validators.required]],
      dateCreated: [{value: '',
                  disabled: false}, [Validators.required]],
      dateResolved: [{value: ''}, [Validators.required]],
      ticketStatus: [{value: ''}, [Validators.required]],
    });

     this.routeParams.params.subscribe(
      (params) => {
        this.serviceId = params['id'];
        this.getServiceTicket();
      }
    );
  }

  private getServiceTicket() {
    this.service.getOneServiceTicket(this.serviceId).subscribe(
      (serviceTicket) => {
        this.serviceTicket.patchValue({
          serviceTicketID: serviceTicket.serviceTicketID || 'na',
          leaseID: serviceTicket.leaseID || 'na',
          userID: serviceTicket.userID || 'na',
          apartmentID: serviceTicket.apartmentID || 'na' ,
          subject: serviceTicket.subject,
          ticketDescription: serviceTicket.ticketDescription || 'na',
          permission: serviceTicket.permission || 'na' ,
          pets: serviceTicket.pets || 'na',
          security: serviceTicket.security || 'na',
          dateCreated: serviceTicket.dateCreated || 'na',
          dateResolved: serviceTicket.dateResolved || 'na',
          ticketStatus: serviceTicket.ticketStatus || 'na'
        });
      }
    );
  }

  public onSubmitRequest() {
    if (this.serviceTicket.valid) {
      this.serviceTicket.value['dateResolved'] = new Date(this.serviceTicket.value['dateResolved']).toISOString();
      this.service.updateServiceTicket(this.serviceTicket.value);
      this.router.navigate(['admin', 'manage']);
      this.toastr.success('Succesfully Updated', 'Service Ticket', {
        timeOut: 2000
      });
    } else {
      this.toastr.error('Failed to Update, Verify all the fields', 'Service Ticket', {
        timeOut: 2000
      });
    }
  }

  public goBack() {
    this.router.navigate(['admin', 'manage']);
  }

}
