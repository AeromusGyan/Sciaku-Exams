import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  qId: any;
  qTitle: any;
  question:any = [];

  constructor(private _route:ActivatedRoute, private _category:CategoryService, private _snackbar:MatSnackBar, private router:Router) { }

  questionForm = new FormGroup({
    content: new FormControl('',Validators.required),
    option1: new FormControl('',Validators.required),
    option2: new FormControl('',Validators.required),
    option3: new FormControl('',Validators.required),
    option4: new FormControl('',Validators.required),
    answer: new FormControl('',Validators.required),
    quiz:new FormGroup({
      qid:new FormControl(null,Validators.required)
    },),
  })
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.getQuestion();
  }

  getQuestion(){
    this._category.getQuestionById(this.qId).subscribe(
      (data:any)=>{
        this.question=data;
      },
      (error)=>{
        console.log(error);
          Swal.fire('Error Failed !!', 'Server error !!','error');
      }
    )
  }
  updateQuestion(){
    if(this.questionForm.value.content=='' || this.questionForm.value.content==null){
      this._snackbar.open('Question is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    else if(this.questionForm.value.option1=='' || this.questionForm.value.option1==null){
      this._snackbar.open('Option 1 is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    if(this.questionForm.value.option2=='' || this.questionForm.value.option2==null){
      this._snackbar.open('Option 2 is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    if(this.questionForm.value.option3=='' || this.questionForm.value.option3==null){
      this._snackbar.open('Option 3 is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    if(this.questionForm.value.option4=='' || this.questionForm.value.option4==null){
      this._snackbar.open('Option 4 is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    if(this.questionForm.value.answer=='' || this.questionForm.value.answer==null){
      this._snackbar.open('Answer is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    else{
      this._category.updateQuestion(this.question).subscribe(
        (data:any)=>{
          Swal.fire('Success !!', 'Question is updated successfully !!','success');
          setTimeout(() => {
            // window.location.href='/admin/questions/'+ this.qId + this.qTitle;
            this.router.navigate(["admin/quizzes"]);
          }, 1000);

        },
        (error)=>{
          console.log(error);
          Swal.fire('Error Failed !!', 'Server error !!','error');
        }
      )
    }
  }
}
