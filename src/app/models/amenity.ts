export class Amenity {

    amntID: string;
    title: string;
    sub_title: string;
    description: string;
    price: string;
    image: string;

    constructor(obj?: any) {
        this.amntID        = obj.amntID || '';
        this.title         = obj.title || '';
        this.sub_title     = obj.sub_title || '';
        this.description   = obj.description || '';
        this.price         = obj.price || '';
        this.image         = obj.image || '';
    }
}
