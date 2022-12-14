import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { CoursesService } from 'src/app/services/courses.service';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  files: any;

  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar, private _member:MemberService) { }

  color: ThemePalette = 'accent';
  checked = false;
  
  coursesForm = new FormGroup({
    title : new FormControl('',Validators.required),
    description : new FormControl('',Validators.required),
    thumbnail : new FormControl('',Validators.required),
    date: new FormControl(formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en')),
    status:new FormControl(true,Validators.required),
})

  ngOnInit(): void {

  }
  onFileSelected(event:any){
    if(event.target.files){
      this.files = event.target.files[0];
    }
  }
  Addbtn(){
    if(this.coursesForm.value.title.trim()=='' || this.coursesForm.value.title==null){
      this._snackbar.open('Title is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    
    this.coursesForm.value.thumbnail = this.files.name;
    alert(JSON.stringify(this.coursesForm.value))
    
    this._member.postFile("profile",this.files).subscribe();
    this._courses.addCourses(this.coursesForm.value).subscribe(
      (data:any)=>{
        this.coursesForm.reset();
        Swal.fire('Success !!', 'Category is added successfully !!','success');
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error Failed !!', 'Server error !!','error');
      }
    )
  }

}
