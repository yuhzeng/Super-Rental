import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewService } from 'app/services/service-export';
import { Review } from 'app/models/review';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  public aptID: string;
  public _reviews: Observable<Review[]>;

  constructor(private _reviewService: ReviewService, private parameter: ActivatedRoute) { }

  ngOnInit() {
    // this._reviews = this._reviewService.getAllReviewsByAptID(this.apartmentID);
    this.parameter.params.subscribe(
      (param) => {
        this.aptID = param['aptID'];
      }
    );
  }

}
