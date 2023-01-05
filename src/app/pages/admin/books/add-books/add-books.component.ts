import { formatDate } from '@angular/common';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Books } from 'src/app/model/books.model';
import { FileHandle } from 'src/app/model/file-handle.model';
import { CoursesService } from 'src/app/services/courses.service';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent {
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
  // Uurl: string = uuid.v4();

  booksForm: Books ={
    b_name: '',
    description: '',
    date: formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en'),
    status: false,
    bid: 0,
    url: '',
    fileName: ''
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
    // // return
    // const targetFile = event.target.files[0];
    // const fileHandle: FileHandle = {
    //   file: targetFile,
    //   url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(targetFile))
    // }
    // this.booksForm.imageFiles.push(fileHandle);
    // console.log(this.booksForm.imageFiles);
    
    // if (this.selectedFiles) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(this.selectedFiles[0]);
    //   reader.onload = (e: any) => {
    //     this.imgUpload = e.target.result;
    //   }
    // }
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

  addBooks(courseForm: NgForm){
    if(this.booksForm.b_name.trim()=='' || this.booksForm.b_name==null){
      this._snackbar.open('Title is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    this.booksForm.fileName = this.selectedFiles[0].name;
    this.currentFile = this.selectedFiles.item(0);
    const modifiedURL = this.booksForm.b_name.replace(/ /g, '-');
    this.booksForm.url = modifiedURL;
    console.log(this.booksForm);
    // const courseFormData = this.prepareFormData(this.currentFile);
    this._courses.addBooks(this.booksForm,this.currentFile).subscribe(
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
}
