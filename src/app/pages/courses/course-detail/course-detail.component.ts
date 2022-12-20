import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent {
  imgUrl:any=environment.imgUrl;
  cid: any;
  
  title = 'Top Free Courses Sciaku ia a Learning platform for Engineering Students';

  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar, private _route:ActivatedRoute, private _meta:Meta, private _title:Title) { }

  course:any=[
    {
      courses:{
      title:''
      }
    }
  ]; 
  loader:any=false;
  spinner:any = false;

  ngOnInit(): void {
    this._title.setTitle(this.title);
    this._meta.updateTag({name:'keywords',content:'top free courses, courses'});
    this._meta.updateTag({name:'description',content:'Top Free Courses Sciaku ia a Learning platform for Engineering Students'});
    this.cid = this._route.snapshot.params['cid'];
    this.getAllCourses();
    // console.log(window.document.location.href);
  }

  getAllCourses(){
    this._courses.getAllActiveCourseVideo(this.cid).subscribe(
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