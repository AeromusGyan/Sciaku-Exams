import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private api: MemberService, private http: HttpClient, private _snackBar: MatSnackBar) { }

  memberForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl(''),
    email: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    city: new FormControl(''),

  })
  durationInSeconds = 2;
  ngOnInit(): void {
  }
  Submit() {
    // alert(JSON.stringify(this.memberForm.value));
    if (this.memberForm.value.username == '' || this.memberForm.value.username == null) {
      this._snackBar.open('Username is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.password == '' || this.memberForm.value.password == null) {
      this._snackBar.open('Password is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.firstname == '' || this.memberForm.value.firstname == null) {
      this._snackBar.open('Firstname is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.email == '' || this.memberForm.value.email == null) {
      this._snackBar.open('Email is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.contact == '' || this.memberForm.value.contact == null) {
      this._snackBar.open('Phone number is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else {
      this.AddMember();
    }
  }
  AddMember() {
    console.log(this.memberForm.value);
    this.api.addMember(this.memberForm.value).subscribe(
      (data: any) => {
        //success
        // console.log(data);
        Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success')
      },
      (error) => {
        //error
        console.log(error);
        Swal.fire('Warning', this.memberForm.value.username + ' is Registered Choose Unique Username !!', 'error');
        // alert('Something went wrong!'+ error);
        //   this._snackBar.open('Something went wrong !!','Close', {
        //     duration: this.durationInSeconds * 1000,
        //     verticalPosition:'bottom',
        // });
      })
  }
}
