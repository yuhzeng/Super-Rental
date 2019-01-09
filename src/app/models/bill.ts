export class Bill {

    billID: string;
    userID: string;
    leaseID: string;
    requestID: string;
    apartmentID: string;
    amount: string;
    dateDue: Date;
    datePaid: Date | null;

    constructor(obj?: any) {
        this.billID         = obj.billID;
        this.userID         = obj.userID;
        this.apartmentID    = obj.apartmentID;
        this.leaseID        = obj.leaseID;
        this.requestID      = obj.requestID;
        this.amount         = obj.amount;
        this.dateDue        = obj.dateDue;
        this.datePaid        = obj.datePaid;
    }

}
