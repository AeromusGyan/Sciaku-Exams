import { SafeUrl } from "@angular/platform-browser";
import { FileHandle } from "./file-handle.model";

export interface Courses{
    cId:number,
    title: string,
    description: string,
    thumbnail: string,
    date: string,
    status: boolean,
    url:string,
    imageFiles: FileHandle []
}