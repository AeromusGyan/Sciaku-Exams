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
    else{
      this.router.navigate(["user/"+0]);
    }
  }

  logout() {
    this.login.logout();
    this.isLoggedin = false;
    this.user = null;
    window.location.reload();

  }
}
