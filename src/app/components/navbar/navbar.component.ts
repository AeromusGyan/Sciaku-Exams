import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login: LoginService, private router: Router) { }

  isLoggedin = false;
  user = null;

  ngOnInit(): void {
    this.isLoggedin = this.login.isLoggedIn();
    this.user = this.login.getUser();
  }
  
  homePage() {
    // alert(JSON.stringify(this.user));
    if (this.login.getUserRole() == "ADMIN") {
      // Admin dashboard
      this.router.navigate(["admin"]);
    }
    else if(this.login.getUserRole() == "NORMAL"){
      this.router.navigate([""]);
    }
  }

  logout() {
    this.login.logout();
    this.isLoggedin = false;
    this.user = null;
    window.location.reload();

  }
  
  myFunction() {
    var x = document.getElementById("myTopnav");
    // x?.classList.toggle('responsive');
    if (x?.className == "row topnav") {
      x.className += (" responsive");
      var y = document.getElementById("tool");
      if (y?.className == "mat-toolbar food-btn mat-primary mat-toolbar-single-row") {       
        y.className += (" nav");
      }
      // else if (y?.className == "mat-toolbar food-btn mat-primary mat-toolbar-single-row nav") {
      //   y.classList.remove("nav");
      // }
      // else {
      //   y?.className == "mat-toolbar food-btn mat-primary mat-toolbar-single-row";
      // }
    }
    else if (x?.className == "row topnav responsive") {
      x.classList.remove("responsive");
    }
    else {
      x?.className == "row topnav";
    }
    console.log(x);
  }

}
