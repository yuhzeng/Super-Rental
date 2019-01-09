export class Appointment {
    appointmentID: string;
    name: number;
    email: boolean;
    start_time: string;

    constructor(obj?: any) {
        this.appointmentID   = obj.appointmentID;
        this.name            = obj.name;
        this.email           = obj.email || false;
        this.start_time      = obj.sentAt;
    }
}
