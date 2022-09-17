import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
  questions:any;

  constructor(private _route:ActivatedRoute, private _service:CategoryService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.getQuestions();
  }

  getQuestions(){
    this._service.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
      },
      (error)=>{

      }
    )
  }

  deleteQuestion(quesid:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        // delete
        let qusid = quesid;
        this._service.deleteQuestion(quesid).subscribe(
          (data:any)=>{
            Swal.fire('Success !!',qusid+ 'Question is Deleted successfully !!','success');
            this.getQuestions();
          },
          (error)=>{
            Swal.fire('Error !!',qusid+ 'Question is not deleted successfully !!','error');
          }
        )
      }
    })
  }
}
