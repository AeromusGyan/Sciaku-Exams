import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-attempted',
  templateUrl: './attempted.component.html',
  styleUrls: ['./attempted.component.css']
})
export class AttemptedComponent implements OnInit {

  user:any = {};
  userResult:any=[
    { quiz: { title: "",description:"",maxMarks:"" } },
  ];

  constructor(private login: LoginService, private question: CategoryService) { 
  }

  ngOnInit(): void {
    this.fetchUser();
    // alert(this.userResult.marksGot)
  }

  fetchUser() {
    this.login.getCurrentUser().subscribe(
      (user: any) => {
        this.user = user;
        this.question.getResultByMember(this.user.id).subscribe(
          (data:any)=>{
            this.userResult = data;
            // console.log(this.userResult);
          }
        )
      },
      (error: any) => {
      }
    )
  }
}
