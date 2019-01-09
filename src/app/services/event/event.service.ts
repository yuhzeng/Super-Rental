// jshint ignore: start
/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';

// TODO: SHRINK THIS PACKAGE IMPORT
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventCollection: AngularFirestoreCollection<Event>;

  constructor(private afs: AngularFirestore) { 
    this.eventCollection = afs.collection<Event>('events');
  }

  createNewEvent(data: any): Promise<void> {
      const eventID = this.afs.createId();
      data.eventID = eventID;
      return this.eventCollection
        .doc(eventID)
        .set(data);
  }

  getAllEvents(): Observable<Event[]> {
    return this.eventCollection
      .valueChanges();
  }

  getOneEvent(eventID: string): Observable<any> {
    return this.eventCollection
      .doc(eventID)
      .valueChanges();
  }

  updateEvent(eventObj: any): Promise<void> {
    const eventID = eventObj.eventID;
    return this.eventCollection
      .doc(eventID)
      .update(eventObj);
  }

  deleteEvent(eventID: string): Promise<void> {
    return this.eventCollection
      .doc(eventID)
      .delete();
  }

  getNextEvent() {
    return this.afs.collection('events', ref => ref.orderBy('date')).valueChanges();
  }

  joinEvent(eventID: string, userData: any) {
    this.eventCollection
      .doc(eventID)
      .update({ attendees: 
        firestore.FieldValue.arrayUnion(userData.userName)
      });
  }
  
}