import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any=[];
  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    this.Categories();
  }
  Categories(){
    this._category.Categories().subscribe(
      (data:any)=>{
        // console.log(data);
        this.categories=data;
      },
      (error)=>{
        Swal.fire('Error','Error in loading data','error');
      }
    )
  }

}
