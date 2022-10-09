import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private login: LoginService, private _snackBar: MatSnackBar, private router: Router, private mailApi: CategoryService, private userApi: MemberService) { }
  durationInSeconds: any = 3;
  otpEnable = false;
  spinner = false;
  verifyEnable = false;
  otp: number = 0;
  userData: any = {
    email:""
  };
  user:any = {};
  memberForm = new FormGroup({
    email: new FormControl('', Validators.required),
    otp: new FormControl('', Validators.required),
  });

  forgotPassword = new FormGroup({
    npassword: new FormControl('', Validators.required),
    cpassword: new FormControl('', Validators.required),
  });

  mailObject: any = {
    to: "",
    subject: "",
    message: ""
  };

  ngOnInit(): void {
  }

  sendOtp() {
    if ((this.memberForm.value.email == '' || this.memberForm.value.email == null)) {
      this._snackBar.open('Email is required!!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    } else {
      this.getUserData();
    }
  }

  sendEmailOtp() {
    this.spinner = true;
    this.otp = Math.floor(Math.random() * 999999);
    // send otp
    this.mailObject.to = this.memberForm.value.email;
    this.mailObject.subject = "One Time Password (OTP) for reset your Password on Sciaku.com"
    this.mailObject.message =  "<div style='background-color:#fff; color:#000; height:100%;'>"
                            + "<div style='background-color:#000; color:#fff; height:100%;'><img src='https://sciaku.com/assets/images/Sciaku.png' style='height:70px; text-align:center; margin-left:135px;'/></div></br>"
                            + "<div style='border: 2px solid black; border-radius: 0px 0px 20px 20px; text-align:center;'><h4>"
                            + "<p>Your One Time Password (OTP) for Verification is : </p>"
                            + "<h3>" + this.otp + "</h3>"
                            + "<p><a style='text-align:center;' href='#'>Unsubscribe</a></p>"
                            + "</div></div>";
    // console.log(this.mailObject);
    this.mailApi.sendMail(this.mailObject).subscribe(
      (data: any) => {
      },
      (error: any) => {
        //  Swal.fire("Server error",'Server Error Please Retry After few minutes!','error');
      }
    )

  }
  verifyOtp() {
    if (this.memberForm.value.otp == this.otp) {
      Swal.fire(' Verified', 'Otp Is Verified!', 'success');
      this.verifyEnable = true;
    }
    else {
      Swal.fire('Wrong Otp', 'Please Enter Correct Otp!', 'error');
    }
  }

  getUserData() {
    this.userApi.getMemberByEmail(this.memberForm.value.email).subscribe(
      (data: any) => {
        this.userData = data;
        // console.log(this.userData);
        if (this.userData == null) {
          this.memberForm.reset();
          this._snackBar.open("Email is not Registerd!", 'Close', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        }
        else if(this.memberForm.value.email == this.userData.email){
          this._snackBar.open("Email is Registerd!", 'Close', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
          this.sendEmailOtp();
          setTimeout(() => {
            this.spinner = false;
            this.otpEnable = true;
          }, 3000);
        }
      },
      (error: any) => {
        Swal.fire("Server error",'Server Error Please Retry After few minutes!','error');
      }
    )
  }

  updatePassword() {
    if ((this.forgotPassword.value.npassword == '' || this.forgotPassword.value.npassword == null || this.forgotPassword.value.cpassword == '' || this.forgotPassword.value.cpassword == null)) {
      this._snackBar.open('Password is required!!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    } else {
      if (this.forgotPassword.value.cpassword == this.forgotPassword.value.npassword ) {
        // update
        this.user.id = this.userData.id;
        this.user.username = this.userData.username;
        this.user.firstname = this.userData.firstname;
        this.user.lastname = this.userData.lastname;
        this.user.email = this.userData.email;
        this.user.password = this.forgotPassword.value.cpassword;
        this.user.city = this.userData.city;
        // console.log(this.user);
        this.userApi.updateUser(this.user).subscribe(
          (data:any)=>{
            Swal.fire("Success",'Your password is updated Successfully!','success');
            this.router.navigate(["login"]);
            this.updatePasswordEmail();
          },
          (err:any)=>{
          Swal.fire("Server error",'Server Error Please Retry After few minutes!','error');
          }
        )
      }
      else {
        this._snackBar.open("Please Enter Same Password", 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    }
  }
  // You Have successfully updated your password 
  updatePasswordEmail(){
    this.mailObject.to = this.memberForm.value.email;
    this.mailObject.subject = "Your Password is successfully updated."
    this.mailObject.message =  "<div style='background-color:#fff; color:#000; height:100%;'>"
                            + "<div style='background-color:#000; color:#fff; height:100%;'><img src='https://sciaku.com/assets/images/Sciaku.png' alt='logo' style='height:70px; text-align:center; margin-left:135px;'/></div></br>"
                            + "<div style='border: 2px solid black; border-radius: 0px 0px 20px 20px; text-align:center;'><h4>"
                            + "<p>Your Password is Successfully updated. Your User details of <a href='www.sciaku.com'>Sciaku.com</a></p>"
                            + "<h3>Username : <b>" + this.user.username +"</b></h3>"
                            + "<h3>Password : <b>" + this.user.password +"</b></h3>"
                            + "<p><a href='www.sciaku.com/login'>Click here</a> to Login on Website</p>"
                            + "<p><a style='text-align:center;' href='#'>Unsubscribe</a></p>"
                            + "</div></div>";
    // console.log(this.mailObject);
    this.mailApi.sendMail(this.mailObject).subscribe(
      (data: any) => {
        console.log("Email send");
      },
      (error: any) => {
        //  Swal.fire("Server error",'Server Error Please Retry After few minutes!','error');
      }
    )
  }
}
