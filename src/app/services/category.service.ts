import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  private baseUrl:string = environment.baseUrl;

  // get all category
  Categories(){
    return this.http.get(`${this.baseUrl}/category/`);
  }
  // add category
  addCategory(category:any){
    return this.http.post(`${this.baseUrl}/category/`,category);
  }

  // get all quizzes
  getAllQuizzes(){
    return this.http.get(`${this.baseUrl}/quiz/`);
  }

  // /get single quiz by qid

  getQuiz(qid:any){
    return this.http.get(`${this.baseUrl}/quiz/${qid}`);
  }

  // Add quiz
  addQuiz(quiz:any){
    return this.http.post(`${this.baseUrl}/quiz/`,quiz);
  }

  // update quiz

  updateQuiz(quiz:any){
    return this.http.put(`${this.baseUrl}/quiz/`,quiz);
  }


  // delete quiz

  deleteQuiz(qid:any){
    return this.http.delete(`${this.baseUrl}/quiz/`+qid);
  }

  // Questions Api
  // get all questions

  getQuestionsOfQuiz(qid:any){
    return this.http.get(`${this.baseUrl}/question/quiz/all/`+qid);
  }

  // get all questions

  getQuestionsOfQuizForTest(qid:any){
    return this.http.get(`${this.baseUrl}/question/quiz/`+qid);
  }

  // add questions of quiz
  addQuestionOfQuiz(question:any){
    return this.http.post(`${this.baseUrl}/question/`,question);
  }

  getQuestionById(quesid:any){
    return this.http.get(`${this.baseUrl}/question/`+quesid);
  }

  // update question

  updateQuestion(question:any){
    return this.http.put(`${this.baseUrl}/question/`,question);
  }
  deleteQuestion(quesId:any){
    return this.http.delete(`${this.baseUrl}/question/`+quesId);
  }

  // Eval quiz
  evalQuiz(questions:any){
    return this.http.post(`${this.baseUrl}/question/eval-quiz`,questions);
  }

  // get quizzes of category
  getQuizzesOfCategory(cid:any){
    return this.http.get(`${this.baseUrl}/quiz/category/`+ cid);
  }

  // get active quizzes
  getActiveQuizzes(){
    return this.http.get(`${this.baseUrl}/quiz/active`);
  }

    // get active quizzes of category
    getActiveQuizzesOfCategory(cid:any){
      return this.http.get(`${this.baseUrl}/quiz/category/active/`+ cid);
    }
    // add result with memberid
    addResult(result:any){
      return this.http.post(`${this.baseUrl}/result/`,result);
    }
    getResultByMember(id:any){
      return this.http.get(`${this.baseUrl}/result/member/`+ id);
    }
}
