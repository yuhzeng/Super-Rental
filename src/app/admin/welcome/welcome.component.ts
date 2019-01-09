import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { ChatService } from 'app/services/chat/chat.service';
import { map } from 'rxjs/operators';
import { BillService, ServiceTicketService, EventService, EnquiryService, PaymentService } from '../../services/service-export';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { LeaseService } from '../../services/lease/lease.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  /** Chat Data */
  private _messages: Observable<ChatMessage[]>;
  private _chatThreads: Observable<ChatThread[]>;
  private _chatThreadIDs: string[];
  private isUserTyping: boolean;
  private activeThread: Observable<ChatThread>;

  /** Dashboard Box Statiscis */
  public numOfTenants: number;
  public serviceRequestsOpen: number;
  public serviceRequestsClosed: number;
  public numberOfEvents: number;
  public enquiriesOpen: number;
  public enquiriesClosed: number;
  public totalPmtAmtRecevied: number;
  public upcomingAppointments: number;


  constructor(private _chatService: ChatService,
    private _billService: BillService,
    private _serviceTicketService: ServiceTicketService,
    private _appointmentService: AppointmentService,
    private _enquiryService: EnquiryService,
    private _paymentService: PaymentService,
    private _leaseService: LeaseService,
    private _eventService: EventService) { }

  ngOnInit() {
    this._chatThreads = this._chatService.getActiveChatThreads();
    // TODO: this is meant to be used to pipe and fill over the dropdown
    // that doesnt work in Daemonite
    // this._chatThreadIDs = [];
    // .pipe(
    //   map(chatThreads => {
    //     return chatThreads;
    //   })
    // );
    this._serviceTicketService.getAllServiceTickets().subscribe(tickets => {

      let openTickets = 0, closedTickets = 0;
      tickets.forEach(ticket => {
        if (ticket.ticketStatus === 'COMPLETED') {
          closedTickets++;
        } else {
          openTickets++;
        }
      });
      this.serviceRequestsOpen = openTickets;
      this.serviceRequestsClosed = closedTickets;
    });
    this._leaseService.getAllTenants().subscribe(tenants => this.numOfTenants = tenants.length);
    this._eventService.getAllEvents().subscribe(events => this.numberOfEvents = events.length);
    this._appointmentService.getAllAppointments()
      .subscribe(upcomingAppointments => this.upcomingAppointments = upcomingAppointments.length);
    this._enquiryService.getAllEnquirys().subscribe(enquiries => {
      let openEnquiries = 0, closedEnquiries = 0;
      enquiries.forEach(ticket => {
        if (ticket.status === 'COMPLETED') {
          closedEnquiries++;
        } else {
          openEnquiries++;
        }
      });
      this.enquiriesOpen = openEnquiries;
      this.enquiriesClosed = closedEnquiries;
    });

    this._paymentService.getAllPayments().subscribe(payments => {
      this.totalPmtAmtRecevied = payments.reduce((acc, nextPayment) => {
        return acc + parseInt(nextPayment.amount, 10);
      }, 0);
    });
  }
}
