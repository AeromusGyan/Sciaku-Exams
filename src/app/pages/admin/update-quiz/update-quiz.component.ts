import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  categ:any;
  quiz:any;

  constructor(private _route:ActivatedRoute, private _service:CategoryService , private _snackbar:MatSnackBar, private router:Router) { }

  quizForm=new UntypedFormGroup({
    title:new UntypedFormControl('',Validators.required),
    description:new UntypedFormControl('',Validators.required),
    maxMarks:new UntypedFormControl('',Validators.required),
    noOfQuestions:new UntypedFormControl('',Validators.required),
    status:new UntypedFormControl(true,Validators.required),
    category:new UntypedFormGroup({
      cid:new UntypedFormControl(null,Validators.required)
    },),
  });

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.getQuiz();
    this.Categories();
  }

  getQuiz(){
    this._service.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        Swal.fire('Error','Erorr data load !!','error');
      }
    )
  }

  updateBtn(){
    if(this.quizForm.value.title =='' || this.quizForm.value.title ==null)
  {
    this._snackbar.open('Title is required !!','Close',{
      duration:3000,
    })
  }
  else if(this.quizForm.value.description =='' || this.quizForm.value.description ==null)
  {
    this._snackbar.open('Description is required !!','Close',{
      duration:3000,
    })
  }
  else if(this.quizForm.value.maxMarks =='' || this.quizForm.value.maxMarks ==null)
  {
    this._snackbar.open('Max Marks is required !!','Close',{
      duration:3000,
    })
  }
  else if(this.quizForm.value.noOfQuestions =='' || this.quizForm.value.noOfQuestions ==null)
  {
    this._snackbar.open('Number of question is required !!','Close',{
      duration:3000,
    })
  }
  else if(this.quizForm.value.category =='' || this.quizForm.value.category ==null)
  {
    this._snackbar.open('Category is required !!','Close',{
      duration:3000,
    })
  }
  else
  {
    this._service.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Success','Quiz is updated successfully !!','success');
        this.router.navigate(['/admin/quizzes']);
      },
      (error)=>{
        Swal.fire('Error','Error in loading data','error');
      }
    )
  }

  }

  Categories(){
    this._service.Categories().subscribe(
      (data:any)=>{
        // console.log(data);
        this.categ=data;
      },
      (error)=>{
        Swal.fire('Error','Error in loading data','error');
      }
    )
  }
}
