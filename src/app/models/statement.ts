export class Statement {

    statementID: string;
    userID: string;
    apartmentID: string;
    amount: string;
    dateDue: number;
    datePaid: number | null;

    constructor(obj?: any) {
        this.statementID    = obj.statementID;
        this.userID         = obj.userID;
        this.apartmentID    = obj.apartmentID;
        this.amount         = obj.amount;
        this.dateDue        = obj.dateDue;
    }

}
