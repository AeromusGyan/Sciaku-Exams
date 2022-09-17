import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private _category:CategoryService, private _snackbar:MatSnackBar) { }

  categoryForm = new FormGroup({
    title : new FormControl('',Validators.required),
    description : new FormControl('',Validators.required)
})

  ngOnInit(): void {

  }
  Addbtn(){
    if(this.categoryForm.value.title.trim()=='' || this.categoryForm.value.title==null){
      this._snackbar.open('Title is Required !!','Close',{
        duration:2000,
      });
      return;
    }
    this._category.addCategory(this.categoryForm.value).subscribe(
      (data:any)=>{
        this.categoryForm.reset();
        Swal.fire('Success !!', 'Category is added successfully !!','success');

      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error Failed !!', 'Server error !!','error');
      }
    )
  }

}
