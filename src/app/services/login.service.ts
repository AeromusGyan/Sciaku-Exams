import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  private baseUrl:string = environment.baseUrl;

  // generate token
  generateToken(logindata:any){
    return this.http.post(`${this.baseUrl}/token`,logindata);
  }

  // get Current user details
  getCurrentUser(){
    return this.http.get(`${this.baseUrl}/current-user`);
  }

  // Login user set token in local storage
  loginUser(token:any){
    localStorage.setItem("token",token);
  }
  isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined ||  tokenStr == '' || tokenStr == null)
    {
      return false;
    }
    else{
      return true;
    }
  }
  // logout
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  // get user
  getToken()
  {
    return localStorage.getItem("token");
  }
  // set user detail
  setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
    return true;
  }
  // get useer
  getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }
  // get user role
  getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
