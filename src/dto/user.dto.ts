export interface Workshift{
    day:string;
    start:string;
    end:string;
}

export interface User{
    _id?:string;
    login: string;
    role: string;
    active: string; // URL or path to image
    workshift: Workshift[]; // The species of the animal e.g. "Lion"
}