import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-lecture',
  templateUrl: './course-lecture.component.html',
  styleUrls: ['./course-lecture.component.css']
})
export class CourseLectureComponent implements OnInit {
  imgUrl:any=environment.imgUrl;
  courses: any=[];
  apiLoaded: any=false;

  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar, private _router:Router, private _route:ActivatedRoute) { }
  
  course:any={};
  vid:any;

  ngOnInit(): void {
    this.vid = this._route.snapshot.params['id'];
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    console.log(this.vid);
    this.getCourseById(this.vid);
    this.getAllCourses();
  }
  ngOnChange():void{
  }
  getAllCourses(){
    this._courses.getAllCourseVideo().subscribe(
      (data:any)=>{
        this.courses=data;
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error','Error in loading data','error');
      }
    )
  }

  getCourseById(vid:any){
    this._courses.getCourseVideoById(vid).subscribe(
      (data:any)=>{
        this.course = data;
      })

  }
  onVideo(title:any,vId:any){
    this._router.navigate(['/course/'+ title +"/"+vId]);
    this.getCourseById(vId);
    console.log(vId);
    
  }
}
