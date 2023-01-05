import { formatDate, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/services/courses.service';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
import { CourseVideo } from 'src/app/model/course-video.model';
import { FileHandle } from 'src/app/model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-course-videos',
  templateUrl: './add-course-videos.component.html',
  styleUrls: ['./add-course-videos.component.css']
})
export class AddCourseVideosComponent implements OnInit {
  // public Editor = ClassicEditor;
  Editor;
  isBrowser = false;
  files: any;
  qId: any;
  qTitle: any;
  constructor(
    private _courses: CoursesService,
    private sanitizer:DomSanitizer, 
    private _snackbar: MatSnackBar, 
    private _member: MemberService, 
    private _route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object
    ) { 
      this.isBrowser = isPlatformBrowser(this.platformId);
      if (this.isBrowser) {
         const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
         this.Editor = ClassicEditor;
         this.Editor.defaultConfig = {
            toolbar: {
               items: ['yourListOfButtons'],
            },
         };
      }
    }

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  selectedFiles: any = FileList;
  currentFile: any = File;
  progress = 0;
  message = '';  
  imgUpload: string = "";
  course: any;

  courseVideoForm:CourseVideo = {
    vId: 0,
    v_title: '',
    v_description: '',
    url: '',
    thumbnail: '',
    date: '',
    status: false,
    imageFiles: [],
    courses: {
      cId: 0,
      title: '',
      description: '',
      thumbnail: '',
      url:''
    },
    v_url: ''
  }
  //  = new UntypedFormGroup({
  //   v_title: new UntypedFormControl('', Validators.required),
  //   v_description: new UntypedFormControl('', Validators.required),
  //   thumbnail: new UntypedFormControl('', Validators.required),
  //   url: new UntypedFormControl('', Validators.required),
  //   date: new UntypedFormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
  //   status: new UntypedFormControl(true, Validators.required),
  //   courses: new UntypedFormGroup({
  //     cId: new UntypedFormControl(null, Validators.required)
  //   },),
  // });

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
  }

  onFileSelected(event:any){
    this.selectedFiles = event.target.files;
    const targetFile = event.target.files[0];
    const fileHandle: FileHandle = {
      file: targetFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(targetFile))
    }
    this.courseVideoForm.imageFiles.push(fileHandle);
    console.log(this.courseVideoForm);
    
    if (this.selectedFiles) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[0]);
      reader.onload = (e: any) => {
        this.imgUpload = e.target.result;
      }
    }
  }
  reset(){
    this.courseVideoForm.imageFiles.pop();
            this.imgUpload = ''
  }
  addCoursVideo(courseVideo:NgForm) {
    this.courseVideoForm.courses.cId = this.qId;
    this.courseVideoForm.imageFiles[0].url = this.selectedFiles[0].name;
    this.courseVideoForm.thumbnail = this.selectedFiles[0].name;
    const modifiedURL = this.courseVideoForm.v_title.replace(/ /g, '-');
    this.courseVideoForm.v_url = modifiedURL;
    console.log(this.courseVideoForm);
    // console.log(this.courseVideoForm);
    if (this.courseVideoForm.v_title == '' || this.courseVideoForm.v_title == null) {
      this._snackbar.open('Title is required !!', 'Close', {
        duration: 3000,
      })
    }
    else if (this.courseVideoForm.v_description == '' || this.courseVideoForm.v_description == null) {
      this._snackbar.open('Description is required !!', 'Close', {
        duration: 3000,
      })
    }
    else if (this.courseVideoForm.thumbnail == '' || this.courseVideoForm.thumbnail == null) {
      this._snackbar.open('Thumbnail is required !!', 'Close', {
        duration: 3000,
      })
    }
    else if (this.courseVideoForm.url == '' || this.courseVideoForm.url == null) {
      this._snackbar.open('URL is required !!', 'Close', {
        duration: 3000,
      })
    }
    else {
      this.currentFile = this.selectedFiles.item(0);
      this._courses.addCourseVideo(this.courseVideoForm, this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
            this.courseVideoForm.imageFiles.pop();
            this.imgUpload = '';
            this.courseVideoForm.url = ''
          }
          if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
          Swal.fire('Success', 'Video is added successfully !!', 'success');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          Swal.fire('Error', 'Video is not added Server error !!', 'error');
        }
      )
    }
  }
}