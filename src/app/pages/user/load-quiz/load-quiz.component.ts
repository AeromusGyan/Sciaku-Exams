import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  constructor(private _route:ActivatedRoute, private _quiz:CategoryService, private _meta:Meta, private _title:Title) { }
  ogtitle = 'Sciaku ia a Quiz Website for Engineering Students - Sciaku.com';
  keyword:string = 'quiz,quiz website, cs quiz, angular quiz, java quiz, python quiz, c, c++, android, kotlin, react, aws,html quiz, css quiz, javascript quiz,js'

  ngOnInit(): void {

    this._title.setTitle(this.ogtitle);
    this._meta.updateTag({name:'keywords',content:this.keyword});
    this._meta.updateTag({name:'description',content:'This is a quiz website. here are many quiz categories is given. you can attempt quiz by your category wise & you can download your result in pdf - Sciaku.com'});
    
    this._route.params.subscribe((params)=>{
      // console.log(params)
      this.catId = params['catId'];
      this.title = params['title'];
      if(this.catId == 0){
        this.getQuizes();
      }
      else{
        // console.log('Load Specific Quiz');
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
