// Any Login module has to implement the IUser interface to implement the login interface.
export interface IUser {
     email: string;
     password: string;
}

// Any Registration module has to implement the IRegister interface.
export interface IUserData {
    uid: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    password?: string;
    gender?: string;
    role?: string;
    about_me?: string;
    lease_id?: string;
    request_id?: string;
    apt_id?: string;
}

export interface IRole {
    role?: string;
}

export interface IRegister {
    guid: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email_id: string;
    password: string;
    role?: string;
    uid: string;
}
