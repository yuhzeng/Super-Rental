import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Appointment } from 'app/models/appointment';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentCollection: AngularFirestoreCollection<Appointment>;

  constructor(private afs: AngularFirestore) {
    this.appointmentCollection = afs.collection<Appointment>('appointments');
  }

  public createNewEvent(data: Appointment): Promise<void> {
      console.log(data);
      const appointmentID = this.afs.createId();
      data.appointmentID = appointmentID;
      return this.appointmentCollection
        .doc(data.start_time.toString())
        .set(data);
  }

  public getAllAppointments(): Observable<Appointment[]> {
    return this.appointmentCollection.valueChanges();
  }

  public getAppointmentCollectionRef(docID: string): firebase.firestore.DocumentReference {
    const appointmenRef = this.appointmentCollection.doc(docID).ref;
    return appointmenRef;
  }
}
