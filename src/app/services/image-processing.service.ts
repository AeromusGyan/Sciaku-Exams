import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseVideo } from '../model/course-video.model';
import { Courses } from '../model/courses.model';
import { FileHandle } from '../model/file-handle.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  // public createCoursesImages(courses:Courses){
  //   const courseImages:any[] = courses.imageFiles;
  //   const courseImagesToFileHandle:FileHandle[]=[];

  //   for(let i = 0; i<courseImages.length; i++){
  //     const imageFileData = courseImages[i];
  //     const imageBlob = this.dataURIBlob(imageFileData.data, imageFileData.type);
  //     const imageFile = new File([imageBlob], imageFileData.name, {type:imageFileData.type});
  //     const finalFileHandle: FileHandle = {
  //       file:imageFile,
  //       url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
  //     }
  //     courseImagesToFileHandle.push(finalFileHandle);
  //   }
  //   courses.imageFiles = courseImagesToFileHandle;
  //   return courses;
  // }

  // public createCourseVideosImages(courses:CourseVideo){
  //   const courseImages:any[] = courses.imageFiles;
  //   const courseImagesToFileHandle:FileHandle[]=[];

  //   for(let i = 0; i<courseImages.length; i++){
  //     const imageFileData = courseImages[i];
  //     const imageBlob = this.dataURIBlob(imageFileData.data, imageFileData.type);
  //     const imageFile = new File([imageBlob], imageFileData.name, {type:imageFileData.type});
  //     const finalFileHandle: FileHandle = {
  //       file:imageFile,
  //       url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
  //     }
  //     courseImagesToFileHandle.push(finalFileHandle);
  //   }
  //   courses.imageFiles = courseImagesToFileHandle;
  //   return courses;
  // }
  public dataURIBlob(data: string, imageType: any){
    const byteString = window.atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let index = 0; index < byteString.length; index++) {
      int8Array[index] = byteString.charCodeAt(index);
      
    }
    const blob = new Blob([int8Array], {type:imageType});
    return blob;
  }
}
