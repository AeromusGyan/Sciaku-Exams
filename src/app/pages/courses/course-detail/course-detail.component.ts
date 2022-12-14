import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/services/courses.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  imgUrl:any=environment.imgUrl;
  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar) { }
  course:any;
  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(){
    this._courses.getAllCourseVideo().subscribe(
      (data:any)=>{
        this.course=data;
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error','Error in loading data','error');
      }
    )
  }
}
