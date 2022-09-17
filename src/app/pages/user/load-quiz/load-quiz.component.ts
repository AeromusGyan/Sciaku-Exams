import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizData: any;
  title: any;
  constructor(private _route:ActivatedRoute, private _quiz:CategoryService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      // console.log(params)
      this.catId = params['catId'];
      this.title = params['title'];
      if(this.catId == 0){
        this.getQuizes();
      }
      else{
        console.log('Load Specific Quiz');
        this.getQuizzesOfCategory();
      }
    })
    
  }

  getQuizes(){
    this._quiz.getActiveQuizzes().subscribe(
      (data:any)=>{
        this.quizData = data;
        // console.log(this.quizData)
      },
      (error)=>{
        alert("Error in loading all data!!")
      }
    )
  }
  getQuizzesOfCategory(){
    this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
      (data:any)=>{
        this.quizData = data;
        // console.log(this.quizData)
      },
      (error)=>{
        alert("Error in loading quiz data!!"+ error)
      }
    )
  }

}
