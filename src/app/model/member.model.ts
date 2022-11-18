import { FileHandle } from "./file-handle.model";

export interface Member{
    id: number,
    username: string,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    profile:string,
    contact:string,
    city:string,
    status: boolean,
    enabled: boolean 
}