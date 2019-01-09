export enum enquiryStatus {
    RECIEVED= 'Recieved',
    COMPLETED = 'Completed',
    PROGRESS = 'Progress'
}

export class Enquiry {
    enquiryID: string;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    contact: string;
    status: string;
    recievedDate?: string;
    resolvedDate?: string;

    constructor(obj: any) {
        this.enquiryID = obj.enquiryID || 'na' ;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.message = obj.message;
        this.contact = obj.contact;
        this.status = obj.status || enquiryStatus.RECIEVED;
        this.recievedDate = obj.recievedDate || '';
        this.resolvedDate = obj.resolvedDate || '';
    }
}


