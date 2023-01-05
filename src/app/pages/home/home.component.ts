import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Courses } from 'src/app/model/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  height: any = 300;
  width: any = 385;
  imgUrl:any=environment.imgUrl;
  constructor(
    private _courses:CoursesService, 
    private _snackbar:MatSnackBar, 
    // private _meta:Meta, 
    // private _title:Title,
    ) { }
  courses:Courses[] = [
    {cId:0,
      title: '',
      description: '',
      thumbnail: '',
      date: '',
      status: false,
      url:'',
      imageFiles:[{
      file:File,
      url: ''
    }]
  }
  ];
  loader:any = false;
  spinner:boolean = false;

 videoId=[
  {id:"8U1hOMrxhr4"},
  {id:"CG8eFZWE4Xo"},
  {id:'H_Cer1OKvgw'}
 ]
  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.width = window.innerWidth - 70;
      this.height = window.innerHeight - 430;
    }
    else {
      this.width = window.innerWidth - 1150;
      this.height = window.innerHeight - 450;
    }
    this.getAllCourses();
  }

  getAllCourses(){
    this._courses.getAllActiveCourses()
      // .pipe(
      //   map((x:Courses[], i) => x.map((course:Courses) => this.imageService.createCoursesImages(course)))
      // )
      .subscribe(
        (res: Courses[]) => {
          this.courses = res;
          // console.log(res); 
        this.spinner = true;
        if (this.courses.length != 0) {
          this.loader = true;
        }
        else{
          this.loader = false;
        }
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        this._snackbar.open('Error in loading data !!','Close',{
          duration:2000,
        });
        // Swal.fire('Error','Error in loading data','error');
      }
    )
  }
}
