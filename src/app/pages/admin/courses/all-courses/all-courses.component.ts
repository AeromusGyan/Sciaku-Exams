import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Courses } from 'src/app/model/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {
  imgUrl:any=environment.imgUrl;
  color: ThemePalette = 'accent';
  checked = false;
  panelOpenState = false;
  imageSource: any;
  
  constructor(
    private _courses: CoursesService,
    private imageService:ImageProcessingService
    ) { }

  courses: Courses[] = [];
  courseStatus:any ={
    status: true
  }
  ngOnInit(): void {
    this.getAllCourses();
  }
  
  getAllCourses() {
    this._courses.getAllCourses()
    // .pipe(
    //   map((x:Courses[], i) => x.map((course:Courses) => this.imageService.createCoursesImages(course)))
    // )
    .subscribe(
      (res: Courses[]) => {
        this.courses = res;
        // console.log(res); 
      },
      (error: any) => {
        // alert("Some Error occured !!");
        Swal.fire('Error Failed !!', 'Server error !!', 'error');
      }
    )
  }

  onUpdateStatus(id: number){
    console.log(this.courses[id].cId, this.courses[id].status);
    this.courseStatus.status = this.courses[id].status;
    this._courses.updateCoursesStatus(this.courses[id].cId, this.courseStatus).subscribe(
      (res:any)=>{
        Swal.fire('Successfully !!', 'Status is Updated !!', 'success');
      },
      (error:HttpErrorResponse)=>{console.log(error);
      }
    );
  }

  deleteCourse(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        let qzid = qId;
        this._courses.deleteCourse(qId).subscribe(
          (res: any) => {
            this.getAllCourses();
            Swal.fire('Deleted', qzid + ' id is deleted succefully !!', 'success');
          },
          (error:HttpErrorResponse) => {
            console.log(error);
            Swal.fire('Error', qzid + ' id is not deleted !!', 'error');
          }
        );
      }
    })
  }
}
