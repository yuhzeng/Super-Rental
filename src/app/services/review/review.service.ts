import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Review } from '../../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewCollection: AngularFirestoreCollection<Review>;

  constructor(private afs: AngularFirestore) {
    this.reviewCollection = afs.collection<Review>('comments');
  }

  createNewReview(data: Review): Promise<void> {
      const reviewID = this.afs.createId();
      return this.reviewCollection
        .doc(data['aptID']).collection('reviews').doc(reviewID).set(data);
  }

  getAllReviews(): Observable<Review[]> {
    return this.reviewCollection
      .valueChanges();
  }

  getAllReviewsByAptID(apartmentID: string): Observable<Review[]> {
    return this.reviewCollection
      .doc(apartmentID)
      .collection<Review>('reviews')
      .valueChanges();
  }

  getOneReview(reviewID: string): Observable<any> {
    return this.reviewCollection
      .doc(reviewID)
      .valueChanges();
  }

  updateReview(reviewObj: any): Promise<void> {
    const reviewID = reviewObj.reviewID;
    return this.reviewCollection
      .doc(reviewID)
      .update(reviewObj);
  }

  deleteReview(reviewID: string): Promise<void> {
    return this.reviewCollection
      .doc(reviewID)
      .delete();
  }

}
