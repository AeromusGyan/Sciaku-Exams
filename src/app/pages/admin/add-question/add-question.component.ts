import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  qId: number | undefined;
  qTitle: any;
  disabled:boolean=true;
  constructor(private _route:ActivatedRoute, private _category:CategoryService, private _snackbar:MatSnackBar) { }

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
    // alert(this.qId)
    this.questionForm.value.quiz.qid = this.qId;
  }

  addQuestion(){
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
      this._category.addQuestionOfQuiz(this.questionForm.value).subscribe(
        (data:any)=>{
          this.questionForm.reset();
          Swal.fire('Success !!', 'Question is added successfully !!','success');
  
        },
        (error:any)=>{
          console.log(error);
          Swal.fire('Error Failed !!', 'Server error !!','error');
        }
      )
  }
  }
}
