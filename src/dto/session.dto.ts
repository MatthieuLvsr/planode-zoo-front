import { User } from ".";

export interface Session{
    _id?:string;
    user:User;
}