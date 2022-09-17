import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  allmember:any=[];
  activemember:any=0;

  constructor(private member:MemberService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.getAllMember();
  }
  getAllMember(){
    this.member.getAllMember().subscribe(
      (data:any)=>{
        this.allmember = data;
        for (let index = 0; index < this.allmember.length; index++) {
          if (this.allmember.status=true) {
            this.activemember=index+1;
          }
          
        }
        if (this.allmember.status=true) {
          
        }
      }
    )
  }

}
