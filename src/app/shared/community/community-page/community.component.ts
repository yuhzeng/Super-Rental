import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService, AuthXService } from 'app/services/service-export';
import { Event } from 'app/models/event';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  public _events: Observable<Event[]>;
  private _userID: string;
  private _userName: string;
  constructor(private _eventService: EventService,
              private _authXservice: AuthXService) { }

  ngOnInit() {
    this._events = this._eventService.getAllEvents();
    this._userID = this._authXservice._currentUser.uid;
    this._userName = this._authXservice._currentUser.displayName;
  }

  handleEventCardAction(event: any) {
    // console.log(event);
    const { action, eventID, currentUserID} = event;
    switch (action) {
      case 'join':
        return this._eventService.joinEvent(eventID, {
          currentUserID: currentUserID,
          userName: this._userName
        });
      case 'delete':
        return this._eventService.deleteEvent(eventID);
    }
  }
}
