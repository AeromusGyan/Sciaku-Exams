import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { formatDate } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-update-course-video',
  templateUrl: './update-course-video.component.html',
  styleUrls: ['./update-course-video.component.css']
})
export class UpdateCourseVideoComponent {
  public Editor = ClassicEditor;
  qId: any;
  qTitle: any;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  course:any={
    v_title:'',
    courses:{
      cId:''
    }
  };

  courses:any;
  files: any;

  constructor(private _route:ActivatedRoute, private _courses:CoursesService,private _member:MemberService, private _snackbar:MatSnackBar, private router:Router) { }

  courseVideoForm=new UntypedFormGroup({
    // vId: new UntypedFormControl(''),
    v_title:new UntypedFormControl('',Validators.required),
    v_description:new UntypedFormControl('',Validators.required),
    thumbnail:new UntypedFormControl('',Validators.required),
    url:new UntypedFormControl('',Validators.required),
    date: new UntypedFormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
    status:new UntypedFormControl(true,Validators.required),
    courses:new UntypedFormGroup({
      cId:new UntypedFormControl(null,Validators.required)
    },),
  });

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.getCourseVideo();
    this.Categories();
  }

  getCourseVideo(){
    this._courses.getCourseVideoById(this.qId).subscribe(
      (data:any)=>{
        this.course=data;
        // console.log(this.course);
      },
      (error:any)=>{
        console.log(error);
          Swal.fire('Error Failed !!', 'Server error !!','error');
      }
    )
  }

  onFileSelected(event:any){
    if(event.target.files){
      this.files = event.target.files[0];
    }
  }
Addbtn(){
  // alert(JSON.stringify(this.course));
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
  else{
    this._member.postFile("profile",this.files).subscribe();
    this._courses.updateCourseVideo(this.course).subscribe(
      (data:any)=>{
        // this.courseVideoForm.reset();
          Swal.fire('Success','Course Video is updated successfully !!','success');
          setTimeout(() => {
            // window.location.href='/admin/questions/'+ this.qId + this.qTitle;
            this.router.navigate(["admin/course-lectures/"+this.course.courses.cId+"/"+this.course.courses.title]);
          }, 1000);
      },
      (error:any)=>{
        Swal.fire('Error','Course Video is not added Server error !!','error');
      }
    )
  }
}
Categories(){
  this._courses.getAllCourses().subscribe(
    (data:any)=>{
      // console.log(data);
      this.courses=data;
    },
    (error:any)=>{
      Swal.fire('Error','Error in loading data','error');
    }
  )
}
}