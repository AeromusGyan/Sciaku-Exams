import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private _courses:CoursesService,private router:Router, private _snackbar:MatSnackBar, private _member:MemberService, private _route:ActivatedRoute) { }
  
  files: any;
  color: ThemePalette = 'accent';
  checked = false;
  
  coursesForm = new UntypedFormGroup({
    title : new UntypedFormControl('',Validators.required),
    description : new UntypedFormControl('',Validators.required),
    thumbnail : new UntypedFormControl('',Validators.required),
    date: new UntypedFormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
    status:new UntypedFormControl(true,Validators.required),
})

  ngOnInit(): void {
    this.cId = this._route.snapshot.params['cid'];
    this.getCourse();
  }
  getCourse(){
    this._courses.getCoursesById(this.cId).subscribe(
      (data:any)=>{
        this.courses=data;
        console.log(this.courses);
      },
      (error:any)=>{
        Swal.fire('Error','Erorr data load !!','error');
      }
    )
  }
  onFileSelected(event:any){
    if(event.target.files){
      this.files = event.target.files[0];
    }
  }
  onUpdate(){
    // alert(JSON.stringify(this.courses))
    if(this.coursesForm.value.title.trim()=='' || this.coursesForm.value.title==null){
      this._snackbar.open('Title is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    
    this.coursesForm.value.thumbnail = this.files.name;
    this._member.postFile("profile",this.files).subscribe();
    this._courses.addCourses(this.courses).subscribe(
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
