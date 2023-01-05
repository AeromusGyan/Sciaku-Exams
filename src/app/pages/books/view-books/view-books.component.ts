import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent {
  books:any=[];
  constructor(private _books:CoursesService) { }

  ngOnInit(): void {
    this.Books();
  }
  Books(){
    this._books.allBooks().subscribe(
      (data:any)=>{
        console.log(data);
        this.books=data;
      },
      (error: HttpErrorResponse)=>{
        Swal.fire('Error','Error in loading data','error');
      }
    )
  }
}
