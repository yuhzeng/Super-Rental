export class Apartment {
    aptID: string;
    title: string;
    sub_title: string;
    description: string;
    type: string;
    image: string;
    baths: string;
    beds: string;

    constructor() {
        this.aptID = null;
        this.title = null;
        this.sub_title = null;
        this.description = null;
        this.type = null;
        this.image = null;
        this.baths = null;
        this.beds = null;
    }

    clearData(): void {
        this.aptID = null;
        this.title = null;
        this.sub_title = null;
        this.description = null;
        this.type = null;
        this.image = null;
        this.baths = null;
        this.beds = null;
    }
}
