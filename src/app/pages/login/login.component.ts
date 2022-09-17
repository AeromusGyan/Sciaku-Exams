import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  durationInSeconds: any = 3;
  constructor(private login: LoginService, private _snackBar: MatSnackBar, private router: Router) { }
  memberForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  Submit() {
    if ((this.memberForm.value.username == '' || this.memberForm.value.username == null) && (this.memberForm.value.password == '' || this.memberForm.value.password == null)) {
      this._snackBar.open('Username and Password is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.username == '' || this.memberForm.value.username == null) {
      this._snackBar.open('Username is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.password == '' || this.memberForm.value.password == null) {
      this._snackBar.open('Password is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else {
      // request for generate token
      this.login.generateToken(this.memberForm.value).subscribe(
        (data: any) => {
          // Login
          // console.log("sucess");
          // console.log(data);
          this.login.loginUser(data.token);
          this.login.getCurrentUser().subscribe(
            (user: any) => {
              this.login.setUser(user);
              // console.log(user);
              // Redirect ....ADMIN admin dshboard
              //Redirect .....NORMAL normal dashboard
              if (this.login.getUserRole() == "ADMIN") {
                // Admin dashboard
                setTimeout(() => {
                  // window.location.href="/admin";
                  this.router.navigate(["admin"]);
                }, 1000);
                Swal.fire('Successfuly done !!', 'User role is ' + this.login.getUserRole(), 'success');
              }
              else if (this.login.getUserRole() == "NORMAL") {
                // User dashboard
                Swal.fire('Successfuly done !!', 'User role is ' + this.login.getUserRole(), 'success');
                setTimeout(() => {
                  // window.location.href='/user/'+0;
                  this.router.navigate(["user/0"]);
                }, 1000);
              }
              else {
                this.login.logout();
              }
            }
          )
        },
        (error) => {
          console.log(error);
          Swal.fire('Warning', 'Invalid details Try again !!', 'error')
        }
      )
    }
  }
}
