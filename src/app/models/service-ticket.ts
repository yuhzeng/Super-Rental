export enum ServiceTicketStatus {
    COMPLETED = 'COMPLETED',
    PROGRESS = 'PROGRESS'
}

export class ServiceTicket {

    leaseID?: string;
    serviceTicketID: string;
    userID: string;
    apartmentID?: string;
    subject: string;
    ticketDescription: string;
    permission: string;
    pets: string;
    security: string;
    dateCreated: string;
    dateResolved: string | null;
    ticketStatus: ServiceTicketStatus;
    requestID: string;

    constructor(obj?: any) {
        this.requestID          = obj.requestID;
        this.leaseID            = obj.leaseID || '';
        this.serviceTicketID    = obj.serviceTicketID || '';
        this.userID             = obj.userID;
        this.apartmentID        = obj.apartmentID;
        this.subject            = obj.subject;
        this.ticketDescription  = obj.ticketDescription;
        this.permission         = obj.permission;
        this.pets               = obj.pets;
        this.security           = obj.security;
        this.dateCreated        = obj.dateCreated;
        this.dateResolved       = obj.dateResolved || '';
        this.ticketStatus       = obj.ticketStatus || 'PROGRESS';
    }
}

