import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file);
    // formData.append(this.baseUrl)
    console.log(formData);
    const req = new HttpRequest('POST', `${this.baseUrl}/image/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    
    // console.log(req)

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/image/files`);
  }

}
