// jshint ignore: start
/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Statement } from '../../models/statement';


@Injectable({
  providedIn: 'root'
})
export class StatementService {

  private statementCollection: AngularFirestoreCollection<Statement>;

  constructor(private afs: AngularFirestore) { 
    this.statementCollection = afs.collection<Statement>('statements');
  }

  createNewStatement(data: any): Promise<void> {
      const statementID = this.afs.createId();
      data.statementID = statementID;
      return this.statementCollection
        .doc(statementID)
        .set(data);
  }

  getAllStatements(): Observable<Statement[]> {
    return this.statementCollection
      .valueChanges();
  }

  getStatementsByUserID(userID: string): Observable<Statement[]> {
    return this.statementCollection
      .doc(userID)
      .collection<Statement>('userStatements')
      .valueChanges();
  }

  getOneStatement(statementID: string): Observable<any> {
    return this.statementCollection
      .doc(statementID)
      .valueChanges();
  }

  updateStatement(statementObj: any): Promise<void> {
    const statementID = statementObj.statementID;
    return this.statementCollection
      .doc(statementID)
      .update(statementObj);
  }

  deleteStatement(statementID: string): Promise<void> {
    return this.statementCollection
      .doc(statementID)
      .delete();
  }
  
}