import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  category: any;

  constructor(public login:LoginService, private _cat:CategoryService) { }
  menu = false;

  ngOnInit(): void {
    this.getCategory();
    this.menu=true;
  }
  getCategory(){
    this._cat.Categories().subscribe(
      (data:any)=>{
        this.category=data;
      },
      (error)=>{
        Swal.fire('Error','Data Loading error','error');
      }
    )
  }
  logout(){
    this.login.logout();
    window.location.reload();
  }

  Enable(){
    this.menu=true;
  }
  Disable(){
    this.menu=false;
  }
  
  load(pos:any){
    window.location.href='/user/'+pos;
  }
}
