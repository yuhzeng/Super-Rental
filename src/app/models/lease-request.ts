export enum LeaseRequestStatus {
    RECIEVED= 'RECIEVED',
    COMPLETED = 'COMPLETED',
    PROGRESS = 'PROGRESS',
    ACCEPT = 'ACCEPT',
    REJECT = 'REJECT'
}

export class Tenant {
    leaseID: string;
    aptID: string;
    uid: string;
    requestID: string;

    constructor(tenantDetails: Object) {
        this.leaseID = tenantDetails['leaseID'] || '';
        this.aptID = tenantDetails['aptID'] || '';
        this.uid = tenantDetails['uid'] || '';
        this.requestID = tenantDetails['requestID'] || '';
    }
}

export class LeaseRequest {
    // Identity Information
    requestID: string;
    aptID: string;
    leaseID: string;
    leasee: LeaseUserData;
    amenities: string[];
    leaseInfo: LeaseInfo;
    status: LeaseRequestStatus;

    clearData() {
        this.requestID = null;
        this.leaseID = null;
        this.aptID = null;
        this.leasee = null;
        this.amenities = null;
        this.leaseInfo = null;
        this.status = null;
    }

    setApartmentID(aptID: string): void {
        this.aptID = aptID;
    }

    getApartmentID(): string {
        return this.aptID;
    }

    setAmenities(amenities: string[]): void {
        this.amenities = amenities;
    }

    getAmenities(): string[] {
        return this.amenities;
    }

    setLeaseInfo(leaseInfo: LeaseInfo): void {
        this.leaseInfo = leaseInfo;
    }

    getLeaseInfo(): LeaseInfo {
        return this.leaseInfo;
    }

    setLeaseData(leasee: LeaseUserData): void {
        this.leasee = leasee;
    }

    getLeaseData(): LeaseUserData {
        return this.leasee;
    }
}

export class LeaseInfo {
     startDate: Date;
     endDate: Date;
     period: number;
     requestDate: Date;
     updateDate: Date;

     clearData(): void {
         this.startDate = null;
         this.endDate = null;
         this.period =  null;
         this.requestDate = null;
         this.updateDate = null;
     }
}

export class LeaseUserData {
    firstName: string;
    lastName: string;
    email: string;
    userID ?: any;
    otherLeasee?: LeaseUserData[];

    clearData(): void {
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.userID = null;
    }
}



