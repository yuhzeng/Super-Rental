import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mail } from 'app/models/mail';
import { LeaseRequest } from 'app/models/lease-request';
import { ServiceTicket } from 'app/models/model-export';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  public urlLeaseRequest = 'https://us-central1-rent365-39145.cloudfunctions.net/sendGrid';

  constructor(private http: HttpClient) { }

  public newLeaseRequestMail(leaseRequest: LeaseRequest) {
    const mail = new Mail({
      toAddress: leaseRequest['leasee']['email'],
      html:  '',
      sendersName:  leaseRequest['leasee']['firstName'],
      text:  '',
      name:  leaseRequest['leasee']['firstName'],
      data:  'Thanks for joining the Super Rental family.',
      mailtype: 'newlease'
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post<Mail>(this.urlLeaseRequest, mail, httpOptions).subscribe(
      (result) => {
        console.log(result);
      }
    );
  }

  public newLServiceRequestMail(leaseRequest: LeaseRequest, serviceTicket: ServiceTicket) {
    const mail = new Mail({
      toAddress: leaseRequest['leasee']['email'],
      html:  '',
      sendersName:  leaseRequest['leasee']['firstName'],
      text:  '',
      name:  leaseRequest['leasee']['firstName'],
      data:  serviceTicket['serviceTicketID'].substr(serviceTicket['serviceTicketID'].length - 8) ,
      mailtype: 'newticket'
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post<Mail>(this.urlLeaseRequest, mail, httpOptions).subscribe(
      (result) => {
        console.log(result);
      }
    );
  }
}
