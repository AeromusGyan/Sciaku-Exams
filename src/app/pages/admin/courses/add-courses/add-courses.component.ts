import { formatDate } from '@angular/common';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Courses } from 'src/app/model/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';
import * as uuid from 'uuid';
import {FileHandle} from 'src/app/model/file-handle.model'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  constructor(
    private _courses:CoursesService,
    private _snackbar:MatSnackBar, 
    private _member:MemberService,
    private sanitizer:DomSanitizer 
    ) { }

  color: ThemePalette = 'accent';
  checked = false;
  imgUpload: string = "";
  selectedFiles: any = FileList;
  currentFile: any = File;
  progress = 0;
  message = '';
  imageData: any = { url: '' };
  Uurl: string = uuid.v4();

  coursesForm: Courses ={
    title: '',
    description: '',
    thumbnail: '',
    date: formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en'),
    status: false,
    cId: 0,
    imageFiles: [],
    url: ''
  }
  
//   = new UntypedFormGroup({
//     title : new UntypedFormControl('',Validators.required),
//     description : new UntypedFormControl('',Validators.required),
//     thumbnail : new UntypedFormControl('',Validators.required),
//     date: new UntypedFormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
//     status:new UntypedFormControl(true,Validators.required),
// })

  ngOnInit(): void {
  }
  onFileSelected(event:any){
    this.selectedFiles = event.target.files;
    // this.selectedFiles[0].name = this.Uurl;
    // console.log(this.selectedFiles[0].name = this.Uurl);
    // const name = this.selectedFiles[0].name.append('userpic', event.target.files[0], 'chris.jpg');
    
    console.log(this.selectedFiles);
    // return
    const targetFile = event.target.files[0];
    const fileHandle: FileHandle = {
      file: targetFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(targetFile))
    }
    this.coursesForm.imageFiles.push(fileHandle);
    console.log(this.coursesForm.imageFiles);
    
    if (this.selectedFiles) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[0]);
      reader.onload = (e: any) => {
        this.imgUpload = e.target.result;
      }
    }
  }

  // upload() {
  //   this.progress = 0;
  //   this.imageData.url = this.Uurl;
  //   this.currentFile = this.selectedFiles.item(0);

  //   if (this.currentFile.size <= 2097152) {
  //     this._member.imageUpload(this.imageData, this.currentFile).subscribe(
  //       (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progress = Math.round(100 * event.loaded / event.total);
  //         }
  //         if (event instanceof HttpResponse) {
  //           this.message = event.body.message;
  //         }
  //       },
  //       err => {
  //         this.progress = 0;
  //         this.message = 'Could not upload the file!';
  //         this.currentFile = undefined;
  //       }
  //     );
  //     this.selectedFiles = undefined;
  //   }
  //   else {
  //     this._snackbar.open("Please Upload the Image Under 2MB", 'Close', {
  //       duration: 5000,
  //       verticalPosition: 'bottom',
  //       horizontalPosition: 'center',
  //     });
  //   }
  // }

  addCourse(courseForm: NgForm){
    if(this.coursesForm.title.trim()=='' || this.coursesForm.title==null){
      this._snackbar.open('Title is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    this.coursesForm.thumbnail = this.selectedFiles[0].name;
    this.coursesForm.imageFiles[0].url = this.selectedFiles[0].name;
    this.currentFile = this.selectedFiles.item(0);
    const modifiedURL = this.coursesForm.title.replace(/ /g, '-');
    this.coursesForm.url = modifiedURL;
    console.log(this.coursesForm);
    // const courseFormData = this.prepareFormData(this.currentFile);
    this._courses.addCourse(this.coursesForm,this.currentFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
        courseForm.reset();
        Swal.fire('Success !!', 'Course is added successfully !!','success');
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        Swal.fire('Error Failed !!', 'Server error !!','error');
      }
    )
  }

  // prepareFormData(data:Courses): FormData{
  //   const formData = new FormData();
  //   formData.append('courseData', 
  //   new Blob([JSON.stringify(data)], {type:'application/json'})
  //   );
  //   formData.append('file',
  //   data.imageFiles.file,
  //   data.imageFiles.file.name
  //   )
  //   return formData;
  // }
}
