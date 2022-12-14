import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { CoursesService } from 'src/app/services/courses.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  imgUrl:any=environment.imgUrl;
  constructor(private _courses:CoursesService, private _snackbar:MatSnackBar) { }
  course:any;
  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(){
    this._courses.getAllCourses().subscribe(
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
