import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Member } from 'src/app/model/member.model';
import { LoginService } from 'src/app/services/login.service';
import { MemberService } from 'src/app/services/member.service';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient,
    private login: LoginService,
    private snackbar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private _member: MemberService
  ) { }

  imageData: any = { url: '' };
  editMode: boolean = true;
  Uurl: string = uuid.v4();
  user: any = { authorities: [{ authority: '' }] };
  imgUrl: any = environment.imgUrl;
  baseUrl:any = environment.baseUrl;
  member = new Member(0, '', '', '', '', '', '', true);
  selectedFiles: any = FileList;
  currentFile: any = File;
  progress = 0;
  message = '';
  URL: string = '';
  image!: Blob;
  imageURL!: SafeUrl;
  imgUpload: string = "";

  ngOnInit(): void {
    this.fetchUser();
  }

  onEdit(id: any) {
    if (id == 1) { this.editMode = false; }
    else { this.editMode = true; }
  }

  loadImage(): Observable<Blob> {
    return this.http.get(this.URL, {
      responseType: "blob"
    });
  }

  fetchUser() {
    this.login.getCurrentUser().subscribe(
      (data: any) => {
        this.user = data;
        this.URL = this.baseUrl +"/file/files/" + this.user.profile;
        // this.URL = "http://localhost:8080/file/files/" + this.user.profile;
        this.loadImage().subscribe(i => {
          this.image = i;
          this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image));
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
        this.snackbar.open('Server Error !!', 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[0]);
      reader.onload = (e: any) => {
        this.imgUpload = e.target.result;
      }
    }
  }

  upload() {
    this.progress = 0;
    this.imageData.url = this.Uurl;
    this.currentFile = this.selectedFiles.item(0);

    if (this.currentFile.size <= 1097152) {
      this._member.imageUpload(this.imageData, this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
          if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        }
      );
      this.selectedFiles = undefined;
    }
    else {
      this.snackbar.open("Please Upload the Image Under 1MB", 'Close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
  }

  updateUser() {
    this.member.id = this.user.id;
    this.member.firstname = this.user.firstname;
    this.member.lastname = this.user.lastname;
    this.member.email = this.user.email;
    this.member.contact = this.user.contact;
    this.member.city = this.user.city;
    this.member.status = this.user.status;
    this.member.profile = this.Uurl;
    this._member.updateProfile(this.member).subscribe(
      (res) => {
        this.snackbar.open("Profile is updated succesfully!!", 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        }
        );
        this.editMode = true;
        this.fetchUser();
      },
      (err) => {
        this.snackbar.open("Profile is not updated!!", 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    );
  }
}
