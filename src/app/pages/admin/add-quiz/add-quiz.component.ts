import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private _category:CategoryService, private _snackbar:MatSnackBar) { }

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  
  categ:any;

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
    this.Categories();
  }

Addbtn(){
  // alert(JSON.stringify(this.quizForm.value));
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
  else{
    this._category.addQuiz(this.quizForm.value).subscribe(
      (data:any)=>{
        this.quizForm.reset();
          Swal.fire('Success','Quiz is added successfully !!','success');
      },
      (error:any)=>{
        Swal.fire('Error','Quiz is not added Server error !!','error');
      }
    )
  }
}
Categories(){
  this._category.Categories().subscribe(
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
