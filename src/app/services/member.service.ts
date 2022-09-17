import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }
  private baseUrl:string = environment.baseUrl;

  addMember(member:any){
    return this.http.post(`${this.baseUrl}/user/`,member)
  }
  getAllMember(){
    return this.http.get(`${this.baseUrl}/user/`);
  }
}
