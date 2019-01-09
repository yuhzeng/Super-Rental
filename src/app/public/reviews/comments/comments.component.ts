import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService, AuthXService } from 'app/services/service-export';
import { Review } from 'app/models/review';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() aptID: string;
  public reviewPost: FormGroup;
  public reviews: Review[];
  public currentRating: number;
  public isClient: boolean;

  constructor(public fb: FormBuilder, public rs: ReviewService, public authX: AuthXService) {}

  ngOnInit() {
    this.isClient = this.authX.isLoggedIn();
    console.log(this.isClient);
    this.reviewPost = this.fb.group({
      aptID: this.aptID,
      post : ['', [Validators.required, Validators.maxLength(500)]],
      timestamp : new Date(),
      rating: ['5', [Validators.max(5), Validators.min(1)]]
    });

    this.currentRating = 5;

    this.rs.getAllReviewsByAptID(this.aptID).subscribe(
      (reviews) => {
        console.log(reviews);
        this.reviews = reviews;
      }
    );
  }

  public dateFix(timestamp: any) {
    // console.log(timestamp);
    const d = new Date(0);
    d.setUTCSeconds(parseInt(timestamp['seconds'], 10));
    return d;
  }

  public onSubmit() {
    if (this.reviewPost.valid) {
      this.reviewPost.get('rating').patchValue(this.currentRating);
      this.rs.createNewReview(this.reviewPost.value).then(
        () => {
          this.reviewPost.get('post').patchValue('');
          this.reviewPost.get('rating').patchValue('5');
        });
    }
  }

  onRatingChanged(rating) {
    console.log(rating);
    this.currentRating = rating;
  }

}
