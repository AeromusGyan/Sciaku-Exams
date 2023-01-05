import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CourseVideo } from 'src/app/model/course-video.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-course-videos',
  templateUrl: './all-course-videos.component.html',
  styleUrls: ['./all-course-videos.component.css']
})
export class AllCourseVideosComponent {

  imgUrl:any=environment.imgUrl;
  qId: any;
  qTitle: any;
  courseVideos:CourseVideo[] = [];
  color: ThemePalette = 'accent';
  checked = false;
  panelOpenState = false;
  constructor(private _route:ActivatedRoute, 
    private _service:CoursesService,
    private imageService:ImageProcessingService
    ) { }
    courseStatus:any ={
      status: true
    }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.getallCourseVideos();
  }

  getallCourseVideos(){
    this._service.getCourseVideoOfCourses(this.qId)
    // .pipe(
    //   map((x:CourseVideo[], i) => x.map((courseVideo:CourseVideo) => this.imageService.createCourseVideosImages(courseVideo)))
    // )
    .subscribe(
      (res: CourseVideo[]) => {
        this.courseVideos = res;
        // console.log(res);
        
        for (let index = 0; index < res.length; index++) {
          // console.log(index);
          
        // console.log(res[index].imageFiles[0].url); 
          
        }
      },
      (error:any)=>{

      }
    )
  }

  onUpdateStatus(id: number){
    console.log(this.courseVideos[id].vId, this.courseVideos[id].status);
    this.courseStatus.status = this.courseVideos[id].status;
    this._service.updateCourseVideoStatus(this.courseVideos[id].vId, this.courseStatus).subscribe(
      (res:any)=>{
        Swal.fire('Successfully !!', 'Status is Updated !!', 'success');
      },
      (error:HttpErrorResponse)=>{console.log(error);
      }
    );
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
            Swal.fire('Success !!','Video is Deleted successfully !!','success');
            this.getallCourseVideos();
          },
          (error:any)=>{
            Swal.fire('Error !!','Video is not deleted successfully !!','error');
          }
        )
      }
    })
  }
}
