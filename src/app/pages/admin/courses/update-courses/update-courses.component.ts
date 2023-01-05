import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from 'src/app/model/courses.model';
import { FileHandle } from 'src/app/model/file-handle.model';
import { CoursesService } from 'src/app/services/courses.service';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-courses',
  templateUrl: './update-courses.component.html',
  styleUrls: ['./update-courses.component.css']
})
export class UpdateCoursesComponent {
  cId: any;
  courses: any={};

  constructor(private _courses:CoursesService,
    private router:Router, 
    private _snackbar:MatSnackBar, 
    private _member:MemberService, 
    private _route:ActivatedRoute,
    private sanitizer:DomSanitizer 
    ) { }
  
  files: any;
  color: ThemePalette = 'accent';
  checked = false;
  imgUpload: string = "";
  selectedFiles: any = FileList;
  currentFile: any = File;
  progress = 0;
  message = '';
  
  coursesForm:Courses = {
    cId: 0,
    title: '',
    description: '',
    thumbnail: '',
    date: '',
    status: false,
    imageFiles: [],
    url: ''
  }
  
//   new UntypedFormGroup({
//     title : new UntypedFormControl('',Validators.required),
//     description : new UntypedFormControl('',Validators.required),
//     thumbnail : new UntypedFormControl('',Validators.required),
//     date: new UntypedFormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
//     status:new UntypedFormControl(true,Validators.required),
// })

  ngOnInit(): void {
    this.cId = this._route.snapshot.params['cid'];
    this.getCourse();
  }
  getCourse(){
    this._courses.getCoursesById(this.cId).subscribe(
      (data:any)=>{
        this.coursesForm=data;
        this.coursesForm.imageFiles.pop();
        console.log(this.coursesForm);
      },
      (error:any)=>{
        Swal.fire('Error','Erorr data load !!','error');
      }
    )
  }
  onFileSelected(event:any){
    this.selectedFiles = event.target.files;
    const targetFile = event.target.files[0];
    const fileHandle: FileHandle = {
      file: targetFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(targetFile))
    }
    this.coursesForm.imageFiles.push(fileHandle);
    if (this.selectedFiles) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[0]);
      reader.onload = (e: any) => {
        this.imgUpload = e.target.result;
      }
    }
  }
  onUpdate(courseForm:NgForm){
    // alert(JSON.stringify(this.coursesForm))
    if(this.coursesForm.title.trim()=='' || this.coursesForm.title==null){
      this._snackbar.open('Title is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    this.currentFile = this.selectedFiles.item(0);
    this.coursesForm.thumbnail = this.selectedFiles[0].name;
    this.coursesForm.imageFiles[0].url = this.selectedFiles[0].name;
    const modifiedURL = this.coursesForm.title.replace(/ /g, '-');
    this.coursesForm.url = modifiedURL;
    console.log(this.coursesForm);
    this._courses.addCourse(this.coursesForm, this.currentFile).subscribe(
      (data:any)=>{
        Swal.fire('Success !!', 'Course is updated successfully !!','success');
        this.router.navigate(['admin/all-courses']);
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error Failed !!', 'Server error !!','error');
      }
    )
  }

}
