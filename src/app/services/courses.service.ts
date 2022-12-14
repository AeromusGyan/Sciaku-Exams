import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }
  private baseUrl:string = environment.baseUrl;

  addCourses(course:any){
    return this.http.post(`${this.baseUrl}/course/`,course);
  }
  getAllCourses(){
    return this.http.get(`${this.baseUrl}/course/`);
  }

  addCourseVideos(courseVideo:any){
    return this.http.post(`${this.baseUrl}/course-videos/`,courseVideo);
  }
  getAllCourseVideo(){
    return this.http.get(`${this.baseUrl}/course-videos/`);
  }

  getCourseVideoById(id:any){
    return this.http.get(`${this.baseUrl}/course-videos/`+id);
  }
}
