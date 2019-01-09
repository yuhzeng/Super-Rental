export class Review {

    reviewID: string;
    userID: string;
    aptID: string;
    reviewText: string;
    rating: number;
    timestamp: Date;

    constructor(obj?: any) {
        this.reviewID       = obj.reviewID || '';
        this.userID         = obj.userID || '';
        this.aptID          = obj.aptID || '';
        this.reviewText     = obj.reviewText || '';
        this.rating         = obj.rating || '';
        this.timestamp      = obj.timestamp || '';
    }

}
