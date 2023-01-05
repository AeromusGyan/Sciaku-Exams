import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Courses } from 'src/app/model/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { MetaService } from 'src/app/services/meta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  
  imgUrl:any=environment.imgUrl;
  constructor(
    private _courses:CoursesService, 
    private _snackbar:MatSnackBar, 
    private _meta:Meta, 
    private _title:Title,
    private imageService:ImageProcessingService,
    private shareService:MetaService
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

  title = 'Top Free Courses Sciaku ia a Learning platform for Engineering Students';
  keyword:string = 'angular, java, python, c, c++, android, kotlin, react, aws,html, css, javascript,js'

  ngOnInit(): void {
    this._title.setTitle(this.title);
    this._meta.updateTag({name:'keywords',content:this.keyword});
    // this._meta.updateTag({name:'description',content:'Top Free Courses Sciaku ia a Learning platform for Engineering Students'});
    this.getAllCourses();
    // console.log(this.course.length);
  }

  getAllCourses(){
    this._courses.getAllActiveCourses()
      // .pipe(
      //   map((x:Courses[], i) => x.map((course:Courses) => this.imageService.createCoursesImages(course)))
      // )
      .subscribe(
        (res: Courses[]) => {
          this.courses = res;
          this.shareService.setFacebookTags(
            window.document.location.href,
            this.title,
            this.title,
            this.courses[0].thumbnail);
          console.log(window.document.location.href,
            this.title,
            this.title,
            this.courses[0].thumbnail); 
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
