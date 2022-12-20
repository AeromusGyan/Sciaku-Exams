import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { CoursesService } from 'src/app/services/courses.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  
  imgUrl:any=environment.imgUrl;
  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar, private _meta:Meta, private _title:Title) { }
  course:any=[];
  loader:any = false;
  spinner:boolean = false;

  title = 'Top Free Courses Sciaku ia a Learning platform for Engineering Students';
  keyword:string = 'angular, java, python, c, c++, android, kotlin, react, aws,html, css, javascript,js'

  ngOnInit(): void {

    this._title.setTitle(this.title);
    this._meta.updateTag({name:'keywords',content:this.keyword});
    this._meta.updateTag({name:'description',content:'Top Free Courses Sciaku ia a Learning platform for Engineering Students'});
    
    this.getAllCourses();
    // console.log(this.course.length);
  }

  getAllCourses(){
    this._courses.getAllActiveCourses().subscribe(
      (data:any)=>{
        this.course=data;
        this.spinner = true;
        if (this.course.length != 0) {
          this.loader = true;
        }
        else{
          this.loader = false;
        }
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error','Error in loading data','error');
      }
    )
  }
}
