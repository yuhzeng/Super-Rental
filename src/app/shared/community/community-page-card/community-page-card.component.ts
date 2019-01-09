import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from 'app/models/event';

@Component({
  selector: 'app-community-page-card',
  templateUrl: './community-page-card.component.html',
  styleUrls: ['./community-page-card.component.css']
})
export class CommunityPageCardComponent implements OnInit {

  @Input() public currentUserID: string;
  @Input() public event: Event;
  @Output() eventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  joinEvent() {
    this.eventEmitter.emit({
      action: 'join',
      eventID: this.event.eventID,
      currentUserID: this.currentUserID
    });
  }

  deleteEvent() {
    this.eventEmitter.emit({
      action: 'delete',
      eventID: this.event.eventID
    });
  }

}
