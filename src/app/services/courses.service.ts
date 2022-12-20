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

  getCoursesById(id:any){
    return this.http.get(`${this.baseUrl}/course/` + id);
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

  getCourseVideoOfCourses(id:any){
    return this.http.get(`${this.baseUrl}/course-videos/courses/`+id);
  }
  updateCourseVideo(courseVideo:any){
    return this.http.put(`${this.baseUrl}/course-videos/`,courseVideo);
  }

  deleteCourse(cid:any){
    return this.http.delete(`${this.baseUrl}/course/`+cid);
  }

  deleteCourseVideos(cid:any){
    return this.http.delete(`${this.baseUrl}/course-videos/`+cid);
  }

  // for all active videos
  getAllActiveCourses(){
    return this.http.get(`${this.baseUrl}/course/active/`);
  }

// for all active videos
  getAllActiveVideos(){
    return this.http.get(`${this.baseUrl}/course-videos/active/`);
  }
  getAllActiveCourseVideo(cid:any){
    return this.http.get(`${this.baseUrl}/course-videos/courses/active/` + cid);
  }
}
