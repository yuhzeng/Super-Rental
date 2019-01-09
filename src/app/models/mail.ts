export class Mail {
    toAddress: string;
    subject:  string;
    html:  string;
    sendersName:  string;
    text:  string;
    name:  string;
    data:  string;
    mailtype: string;

    constructor(obj?: any) {
        this.toAddress    = obj.toAddress;
        this.subject      = obj.subject || 'Team Super Rentals';
        this.html         = obj.html || '';
        this.sendersName  = obj.sendersName || '';
        this.text         = obj.text || 'Team Super Rentals';
        this.name         = obj.name || 'Super Rentals';
        this.data         = obj.data || 'Super Rentals';
        this.mailtype     = obj.mailtype || 'na';
    }
}
