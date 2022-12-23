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
  thumb:any;

  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar, private _route:ActivatedRoute, private _meta:Meta, private _title:Title) { }

  course:any=[
    {
      courses:{
      title:''
      },
      thumbnail:''
    }
  ]; 
  loader:any=false;
  spinner:any = false;

  ngOnInit(): void {
    this.cid = this._route.snapshot.params['cid'];
    this.getAllCourses();
    // console.log(window.document.location.href);
    this._courses.createLinkForCanonicalURL();
  }

  getAllCourses(){
    this._courses.getAllActiveCourseVideo(this.cid).subscribe(
      (data:any)=>{
        this.course=data;
        this.thumb = this.imgUrl +'/'+ this.course[0].thumbnail;

        this._title.setTitle(this.course[0].courses.title);
        this._meta.updateTag({property:'og:title', content: this.course[0].courses.title});
        this._meta.updateTag({name:'description',content: this.course[0].courses.description});
        this._meta.updateTag({property:'og:description',content: this.course[0].courses.description});
        this._meta.updateTag({name:'image', content: this.thumb});  
        this._meta.updateTag({property:'og:image', content: this.thumb});  
        this._meta.updateTag({name:'url', content: window.document.location.href});
        this._meta.updateTag({property:'og:url', content: window.document.location.href});
        this._meta.updateTag({name:'keywords',content:'top free courses, courses'});   

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