import { SafeUrl } from "@angular/platform-browser";
import { FileHandle } from "./file-handle.model";

export interface CourseVideo{
    courses: {
        url: string;
        cId:number,
        title:string,
        description:string,
        thumbnail:string
    };
    vId:number,
    v_title: string,
    v_description: string,
    v_url: string,
    url:string,
    thumbnail: string,
    date: string,
    status: boolean,
    imageFiles: FileHandle []
}