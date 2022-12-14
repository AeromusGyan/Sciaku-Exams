import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file-handle.model';
import { Member } from 'src/app/model/member.model';
import { LoginService } from 'src/app/services/login.service';
import { MemberService } from 'src/app/services/member.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private login:LoginService, private snackbar:MatSnackBar, private sanitizer: DomSanitizer, private _member:MemberService) { }

  user:any ={"authorities":[{authority:""}]};

  imgUrl:any=environment.imgUrl;

  member: any = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    profile: '',
    contact: '',
    city: '',
    status: true
  }

  files:any;

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser(){
    this.login.getCurrentUser().subscribe(
      (data:any)=>{
        this.user = data;
      },
      (error:HttpErrorResponse)=>{
        this.snackbar.open('Server Error !!', 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }
  onFileSelected(event:any){
    // this.user.profile 
    if(event.target.files){
      this.files = event.target.files[0];
      // console.log(event.target.files[0]);
      
      // const filehandle :any = {
      //   file : files,
      //   url: this.sanitizer.bypassSecurityTrustUrl(
      //     window.URL.createObjectURL(files)
      //   )
      // }
      // this.member.userImages.push(filehandle);
    }
  }
  updateUser(){
    this.member.id = this.user.id;
        this.member.username = this.user.username;
        this.member.firstname = this.user.firstname;
        this.member.lastname = this.user.lastname;
        this.member.email = this.user.email;
        // this.member.password = this.user.password;
        this.member.contact = this.user.contact;
        this.member.status = this.user.status;
        this.member.city = this.user.city;
        this.member.status = this.user.status;
        this.member.profile = this.files.name
    // console.log(this.member);
    // const memberFormData = this.prepareFormData(this.member);
    this._member.postFile("profile",this.files).subscribe();

    this._member.updatePassword(this.member).subscribe();
  }

  // prepareFormData(member:any):FormData{
  //   const formData = new FormData();
  //   formData.append(
  //     'member',
  //     new Blob([JSON.stringify(member)],{type: 'application/json'})
  //   );
  //   for(var i = 0; member.userImages.length; i++){
  //     formData.append(
  //       'image',
  //       this.member.userImages[0].file,
  //       this.member.userImages[0].file.name
  //     );
  //     console.log("file: " + this.member.userImages[i].file);
  //   }
  //   return formData;
  // }
}
