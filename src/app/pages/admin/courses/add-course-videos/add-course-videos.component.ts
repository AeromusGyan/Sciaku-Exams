import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/services/courses.service';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course-videos',
  templateUrl: './add-course-videos.component.html',
  styleUrls: ['./add-course-videos.component.css']
})
export class AddCourseVideosComponent implements OnInit {
  files: any;
  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar, private _member:MemberService) { }

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  
  course:any;

  courseVideoForm=new FormGroup({
    v_title:new FormControl('',Validators.required),
    v_description:new FormControl('',Validators.required),
    thumbnail:new FormControl('',Validators.required),
    url:new FormControl('',Validators.required),
    date: new FormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
    status:new FormControl(true,Validators.required),
    courses:new FormGroup({
      cId:new FormControl(null,Validators.required)
    },),
  });
  
  ngOnInit(): void {
    this.Categories();
  }

  onFileSelected(event:any){
    if(event.target.files){
      this.files = event.target.files[0];
    }
  }
  
Addbtn(){
  alert(JSON.stringify(this.courseVideoForm.value));
  this.courseVideoForm.value.thumbnail = this.files.name;
  if(this.courseVideoForm.value.v_title =='' || this.courseVideoForm.value.v_title ==null)
  {
    this._snackbar.open('Title is required !!','Close',{
      duration:3000,
    })
  }
  else if(this.courseVideoForm.value.v_description =='' || this.courseVideoForm.value.v_description ==null)
  {
    this._snackbar.open('Description is required !!','Close',{
      duration:3000,
    })
  }
  else if(this.courseVideoForm.value.thumbnail =='' || this.courseVideoForm.value.thumbnail ==null)
  {
    this._snackbar.open('Thumbnail is required !!','Close',{
      duration:3000,
    })
  }
  else if(this.courseVideoForm.value.url =='' || this.courseVideoForm.value.url ==null)
  {
    this._snackbar.open('URL is required !!','Close',{
      duration:3000,
    })
  }
  else if(this.courseVideoForm.value.courses =='' || this.courseVideoForm.value.courses ==null)
  {
    this._snackbar.open('Course is required !!','Close',{
      duration:3000,
    })
  }
    
  else{
    
    this._member.postFile("profile",this.files).subscribe();
    this._courses.addCourseVideos(this.courseVideoForm.value).subscribe(
      (data:any)=>{
        this.courseVideoForm.reset();
          Swal.fire('Success','Video is added successfully !!','success');
      },
      (error:any)=>{
        Swal.fire('Error','Video is not added Server error !!','error');
      }
    )
  }
}
Categories(){
  this._courses.getAllCourses().subscribe(
    (data:any)=>{
      // console.log(data);
      this.course=data;
    },
    (error:any)=>{
      Swal.fire('Error','Error in loading data','error');
    }
  )
}
}