import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _quiz:CategoryService,private _router:Router) { }

  qid:any;
  quizData:any=[];

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // alert(this.qid)
    this.getQuiz();
  }

  getQuiz(){
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quizData = data;
      },
      (error)=>{
        alert("Error in loading data !!!")
      }
    )
  }
  startQuiz(){
    // [routerLink]="'/start/'+qid"
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Start',
      // denyButtonText: `Don't Start`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qid]);
      } else if (result.isDenied) {
        
      }
    })
  }
}
