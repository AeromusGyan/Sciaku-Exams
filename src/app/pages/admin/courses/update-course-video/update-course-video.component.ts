import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { formatDate, isPlatformBrowser } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { MemberService } from 'src/app/services/member.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseVideo } from 'src/app/model/course-video.model';
import { FileHandle } from 'src/app/model/file-handle.model';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-course-video',
  templateUrl: './update-course-video.component.html',
  styleUrls: ['./update-course-video.component.css']
})
export class UpdateCourseVideoComponent {
  Editor;
  isBrowser = false;
  constructor(private _route: ActivatedRoute,
    private _courses: CoursesService,
    private _member: MemberService,
    private _snackbar: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer,
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

  // public Editor = ClassicEditor;
  qId: any;
  qTitle: any;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  courses: any;
  files: any;
  imgUpload: string = "";
  selectedFiles: any = FileList;
  currentFile: any = File;
  progress = 0;
  message = '';

  courseVideoForm: CourseVideo = {
    courses: {
      cId: 0,
      title: '',
      description: '',
      thumbnail: '',
      url:''
    },
    vId: 0,
    v_title: '',
    v_description: '',
    url: '',
    thumbnail: '',
    date: '',
    status: false,
    imageFiles: [],
    v_url: ''
  }

  // new UntypedFormGroup({
  //   // vId: new UntypedFormControl(''),
  //   v_title:new UntypedFormControl('',Validators.required),
  //   v_description:new UntypedFormControl('',Validators.required),
  //   thumbnail:new UntypedFormControl('',Validators.required),
  //   url:new UntypedFormControl('',Validators.required),
  //   date: new UntypedFormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
  //   status:new UntypedFormControl(true,Validators.required),
  //   course_lectures:new UntypedFormGroup({
  //     lId:new UntypedFormControl(null,Validators.required)
  //   },),
  // });

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.getCourseVideo();
    this.Categories();
  }

  getCourseVideo() {
    this._courses.getCourseVideoById(this.qId).subscribe(
      (data: any) => {
        this.courseVideoForm = data;
        this.courseVideoForm.imageFiles.pop();
        // console.log(this.courseVideoForm);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error Failed !!', 'Server error !!', 'error');
      }
    )
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    const targetFile = event.target.files[0];
    const fileHandle: FileHandle = {
      file: targetFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(targetFile))
    }
    this.courseVideoForm.imageFiles.push(fileHandle);
    // console.log(this.courseVideoForm);

    if (this.selectedFiles) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[0]);
      reader.onload = (e: any) => {
        this.imgUpload = e.target.result;
      }
    }
  }

  updateCourseVideo(courseForm: NgForm) {
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
      this.courseVideoForm.thumbnail = this.selectedFiles[0].name;
      this.courseVideoForm.imageFiles[0].url = this.selectedFiles[0].name;
      const modifiedURL = this.courseVideoForm.v_title.replace(/ /g, '-');
      this.courseVideoForm.v_url = modifiedURL;
      console.log(this.courseVideoForm);
      // alert(JSON.stringify(this.courseVideoForm));
      this._courses.updateCourseVideo(this.courseVideoForm, this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
            courseForm.reset();
            // Swal.fire('Success', 'Course Video is updated successfully !!', 'success');
            setTimeout(() => {
              this.router.navigate(["admin/course-lectures/" + this.courseVideoForm.courses.url + "/" + this.courseVideoForm.courses.cId]);
            }, 1000);
          }
          if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
        },
        (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Course Video is not added Server error !!', 'error');
        }
      )
    }
  }
  Categories() {
    this._courses.getAllCourses().subscribe(
      (data: any) => {
        // console.log(data);
        this.courses = data;
      },
      (error: any) => {
        Swal.fire('Error', 'Error in loading data', 'error');
      }
    )
  }
}