import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseVideo } from '../model/course-video.model';
import { Courses } from '../model/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(@Inject(DOCUMENT) private doc:any, private http:HttpClient) { }
  
  private baseUrl:string = environment.baseUrl;

  // createLinkForCanonicalURL() {
  //   let link: HTMLLinkElement = this.doc.createElement('link');
  //   link.setAttribute('rel', 'canonical');
  //   this.doc.head.appendChild(link);
  //   link.setAttribute('href', this.doc.URL);
  // }

  addCourses(course:any){
    return this.http.post(`${this.baseUrl}/course/`,course);
  }

  addCourse(data:any, file:File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('courseData', JSON.stringify(data));
    // console.log(data, file);
    
    const req = new HttpRequest('POST', `${this.baseUrl}/course/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getAllCourses(){
    return this.http.get<Courses[]>(`${this.baseUrl}/course/`);
  }

  getCoursesById(id:any){
    return this.http.get(`${this.baseUrl}/course/` + id);
  }

  // Course Lectures API
  // addCourseLectures(courseLecture:any){
  //   return this.http.post(`${this.baseUrl}/course-lectures/`, courseLecture);
  // }

  // getAllCourseLecturesOfCourses(id:any){
  //   return this.http.get(`${this.baseUrl}/course-lectures/courses/`+id);
  // }

  // getAllActiveCourseLectures(cid:any){
  //   return this.http.get(`${this.baseUrl}/course-lectures/courses/active/` + cid);
  // }

  // Couurse Videos API
  addCourseVideos(courseVideo:any){
    return this.http.post(`${this.baseUrl}/course-videos/`, courseVideo);
  }
  addCourseVideo(data:any, file:File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('courseData', JSON.stringify(data));
    // console.log(data, file);
    const req = new HttpRequest('POST', `${this.baseUrl}/course-videos/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  updateCoursesStatus(id:number, status:any){
    return this.http.put(`${this.baseUrl}/course/`+ id , status);
  }
  getCourseVideoOfCourses(id:any){
    return this.http.get<CourseVideo[]>(`${this.baseUrl}/course-videos/courses/`+id);
  }

  getAllCourseVideo(){
    return this.http.get(`${this.baseUrl}/course-videos/`);
  }

  getCourseVideoById(id:any){
    return this.http.get(`${this.baseUrl}/course-videos/`+id);
  }

  updateCourseVideo(data:any, file:File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('courseData', JSON.stringify(data));
    // console.log(data, file);
    const req = new HttpRequest('POST', `${this.baseUrl}/course-videos/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  updateCourseVideoStatus(id:number, status:any){
    return this.http.put(`${this.baseUrl}/course-videos/`+ id , status);
  }
  // (courseVideo:any){
  //   return this.http.put(`${this.baseUrl}/course-videos/`,courseVideo);
  // }

  // for all active videos
  getAllActiveVideos(){
    return this.http.get(`${this.baseUrl}/course-videos/active/`);
  }
  getAllActiveCourseVideo(cid:any){
    return this.http.get<CourseVideo[]>(`${this.baseUrl}/course-videos/courses/active/` + cid);
  }

  deleteCourse(cid:any){
    return this.http.delete(`${this.baseUrl}/course/`+cid);
  }

  deleteCourseVideos(cid:any){
    return this.http.delete(`${this.baseUrl}/course-videos/`+cid);
  }

  // for all active videos
  getAllActiveCourses(){
    return this.http.get<Courses[]>(`${this.baseUrl}/course/active/`);
  }

  addBooks(data:any, file:File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(data));
    // console.log(data, file);
    
    const req = new HttpRequest('POST', `${this.baseUrl}/books/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  allBooks(){
    return this.http.get(`${this.baseUrl}/books/`);
  }
}
