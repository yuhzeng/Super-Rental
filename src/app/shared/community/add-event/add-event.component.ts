import { Component, OnInit } from '@angular/core';
import { EventService, AuthXService } from 'app/services/service-export';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  add_event_form: FormGroup;
  userID: string;
  constructor(private _eventService: EventService,
              private router: Router,
              private fb: FormBuilder,
              private _authXservice: AuthXService) { }

  ngOnInit() {
    this.userID = this._authXservice._currentUser.uid;
    this.add_event_form = this.fb.group({
      eventTitle: ['', [ Validators.required]],
      date: ['', [ Validators.required]],
      eventDescription: ['', [Validators.required]],
      pictureURL: ['']
    });
  }

  createNewEvent() {
    return this._eventService.createNewEvent({
      date: Date.now(),
      eventTitle: this.add_event_form.get('eventTitle').value,
      eventDescription: this.add_event_form.get('eventDescription').value,
      pictureURL: this.add_event_form.get('pictureURL').value,
      eventCreator: this.userID,
    }).then(() => this.router.navigate(['client/community']));
  }

}
