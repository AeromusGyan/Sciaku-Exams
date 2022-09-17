import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  @Input()
  defaultElevation = 2;

  @Input()
  raisedElevation = 8;

  constructor(private _category: CategoryService) { }

  quizzes: any;

  ngOnInit(): void {
    this.getAllQuizzes();
  }
  
  getAllQuizzes() {
    this._category.getAllQuizzes().subscribe(
      (data: any) => {
        // console.log(data);
        this.quizzes = data;
      },
      (error: any) => {
        // alert("Some Error occured !!");
        Swal.fire('Error Failed !!', 'Server error !!', 'error');
      }
    )
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        let qzid = qId;
        this._category.deleteQuiz(qId).subscribe(
          (res: any) => {
            this.quizzes = this.quizzes.filter((quiz: { qId: any; }) => quiz.qId != qId);
            this.getAllQuizzes();
            Swal.fire('Deleted', qzid + ' id is deleted succefully !!', 'success');
          },
          (error) => {
            Swal.fire('Error', qzid + ' id is not deleted !!', 'error');
          }
        );
      }
    })
  }

}
