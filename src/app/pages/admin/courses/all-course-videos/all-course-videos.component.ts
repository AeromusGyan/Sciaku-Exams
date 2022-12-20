import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-course-videos',
  templateUrl: './all-course-videos.component.html',
  styleUrls: ['./all-course-videos.component.css']
})
export class AllCourseVideosComponent {

  qId: any;
  qTitle: any;
  questions:any;

  color: ThemePalette = 'accent';
  checked = false;
  constructor(private _route:ActivatedRoute, private _service:CoursesService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.getQuestions();
  }

  getQuestions(){
    this._service.getCourseVideoOfCourses(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
      },
      (error:any)=>{

      }
    )
  }

  deleteQuestion(vId:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        // delete
        this._service.deleteCourseVideos(vId).subscribe(
          (data:any)=>{
            Swal.fire('Success !!',vId+ 'Question is Deleted successfully !!','success');
            this.getQuestions();
          },
          (error:any)=>{
            Swal.fire('Error !!',vId+ 'Question is not deleted successfully !!','error');
          }
        )
      }
    })
  }
}
