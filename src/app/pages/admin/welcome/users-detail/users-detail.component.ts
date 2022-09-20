import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {

  constructor(private member:MemberService) { }
  allmember:any=[];
  ngOnInit(): void {
    this.getAllMember();
  }
  getAllMember(){
    this.member.getAllMember().subscribe(
      (data:any)=>{
        this.allmember = data;
      }
    )
  }
}
