import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/services/courses.service';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-course-lectures',
  templateUrl: './add-course-lectures.component.html',
  styleUrls: ['./add-course-lectures.component.css']
})
export class AddCourseLecturesComponent {
  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar, private _member:MemberService, private _route:ActivatedRoute) { }

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  course:any;
  cid:any;
  ctitle:any;
  courseLectureForm=new UntypedFormGroup({
    l_title:new UntypedFormControl('',Validators.required),
    date: new UntypedFormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
    status:new UntypedFormControl(true,Validators.required),
    courses:new UntypedFormGroup({
      cId:new UntypedFormControl(null,Validators.required)
    },),
  });
  
  ngOnInit(): void {
    this.cid = this._route.snapshot.params['id'];
    this.ctitle = this._route.snapshot.params['title'];
    // this.Categories();
  }

Addbtn(){
  this.courseLectureForm.value.courses.cId = this.cid;
  alert(JSON.stringify(this.courseLectureForm.value));
  if(this.courseLectureForm.value.l_title =='' || this.courseLectureForm.value.l_title ==null)
  {
    this._snackbar.open('Title is required !!','Close',{
      duration:3000,
    })
  }
  // else if(this.courseLectureForm.value.courses =='' || this.courseLectureForm.value.courses ==null)
  // {
  //   this._snackbar.open('Course is required !!','Close',{
  //     duration:3000,
  //   })
  // }
  // else{
  //   this._courses.addCourseLectures(this.courseLectureForm.value).subscribe(
  //     (data:any)=>{
  //       // this.courseVideoForm.reset();
  //         Swal.fire('Success','Lecture is added successfully !!','success');
  //     },
  //     (error:any)=>{
  //       Swal.fire('Error','Lecture is not added Server error !!','error');
  //     }
  //   )
  // }
}
// Categories(){
//   this._courses.getAllCourses().subscribe(
//     (data:any)=>{
//       // console.log(data);
//       this.course=data;
//     },
//     (error:any)=>{
//       Swal.fire('Error','Error in loading data','error');
//     }
//   )
// }
}