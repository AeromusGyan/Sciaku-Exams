import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CoursesService } from 'src/app/services/courses.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {
  imgUrl:any=environment.imgUrl;
  @Input()
  defaultElevation = 2;

  @Input()
  raisedElevation = 8;
  color: ThemePalette = 'accent';
  checked = false;
  constructor(private _courses: CoursesService) { }

  courses: any = [];

  ngOnInit(): void {
    this.getAllCourses();
  }
  
  getAllCourses() {
    this._courses.getAllCourses().subscribe(
      (data: any) => {
        // console.log(data);
        this.courses = data;
      },
      (error: any) => {
        // alert("Some Error occured !!");
        Swal.fire('Error Failed !!', 'Server error !!', 'error');
      }
    )
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
            // this.courses = this.courses.filter((quiz: { qId: any; }) => quiz.qId != qId);
            this.getAllCourses();
            Swal.fire('Deleted', qzid + ' id is deleted succefully !!', 'success');
          },
          (error:any) => {
            Swal.fire('Error', qzid + ' id is not deleted !!', 'error');
          }
        );
      }
    })
  }

}
