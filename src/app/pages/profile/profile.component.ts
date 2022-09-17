import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private login:LoginService, private snackbar:MatSnackBar) { }

  user:any ={"authorities":[{authority:""}]}
;

  ngOnInit(): void {
    // this.user=this.login.getUser();
    this.fetchUser();
  }

  fetchUser(){
    this.login.getCurrentUser().subscribe(
      (user:any)=>{
        this.user = user;
      },
      (error:any)=>{
        this.snackbar.open('Server Error !!', 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }
}
