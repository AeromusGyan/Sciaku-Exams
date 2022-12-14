import { formatDate, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {

  constructor(private login: LoginService, private _route: ActivatedRoute, private locationSt: LocationStrategy, private question: CategoryService, private _router: Router, private snackbar: MatSnackBar) { }

  qid: any;
  quesData: any = [
    { quiz: { title: ""} },
    { category: { title: "" } }
  ];

  eval: any = {
  };
  
  result: any = {
    marksGot: '',
    correct_answer: '',
    attempted: '',
    date: formatDate(new Date(), 'yyyy/MM/dd, h:mm:ss a ', 'en'),
    member: { id: '' },
    quiz: { qid: '' }
  }

  pageSlice: any = [];
  user: any = {};

  // totalLength : any;
  // page:number = 1 ;
  // correct:any;
  // incorrect:any;
  // marks:any=false;
  // qnsCount: number = 0;
  // arrayLength: number = 0;
  // next = false;
  // selectedAns: any;
  // selectedIndex: any;
  // option = false;

  // marksGot: any = 0;
  // correctAns: any = 0;
  // attempted: any = 0;
  isSubmit: any = false;
  timer: any;

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestion();
    this.fetchUser();
  }

  loadQuestion() {
    this.question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data) => {
        // console.log(data);
        this.quesData = data;
        this.pageSlice = this.quesData.slice(0, 1);
        this.timer = this.quesData.length * 2 * 60;

        // this.quesData.forEach((q: { [x: string]: any; }) => {
        //   q['givenAnswer'] = '';
        // });
        this.startTimer();
      },
      (error) => {
        alert('Error in loading questions' + error);
      }
    )
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();

        this.addResult();
      } else if (result.isDenied) {

      }
    })
  }

  fetchUser() {
    this.login.getCurrentUser().subscribe(
      (user: any) => {
        this.user = user;
      },
      (error: any) => {
        this.snackbar.open('Server Error !!', 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }

  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormatedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min:${ss} sec`;
  }

  addResult() {
    
  }
  evalQuiz() {
    this.question.evalQuiz(this.quesData).subscribe(
      (data) => {
        this.eval = data;
        // console.log(data);
        this.result.marksGot = this.eval.marksGot;
        this.result.marksGot = this.eval.marksGot.toFixed(2);
        this.result.correct_answer = this.eval.correctAns;
        this.result.attempted = this.eval.attempted;
        this.result.member.id = this.user.id;
        this.result.quiz.qid = this.quesData[0].quiz.qId;
        // console.log(this.result);
        this.question.addResult(this.result).subscribe(
          (data: any) => {
            Swal.fire('Success !!', 'Quiz is Submitted successfully !!', 'success');
          },
          (error: any) => {
            alert("Some error!!")
          }
        )
        this.isSubmit = true;
      },
      (error) => {
        alert("Error in submit data");
      }
    )
    // this.quesData.forEach((q: any)=>{
    //   if(q.givenAnswer == q.answer){
    //     this.correctAns++;
    //     let singleMarks = this.quesData[0].quiz.maxMarks/this.quesData.length;
    //     this.marksGot += singleMarks;
    //   }
    //   if(q.givenAnswer.trim() != ''){
    //     this.attempted++;
    //   }
    // })       
    // console.log('Correct Answer'+this.correctAns);
    // console.log('Marks got'+this.marksGot);
    // console.log('attempted :'+this.attempted);
  }

  printPage() {
    window.print();
  }

  // userans(pos: any, ans: any) {
  //   this.quesData[pos].userans = ans;
  //   localStorage.setItem('qans', this.quesData[pos].userans);
  //   this.selectedIndex = this.quesData[pos].answer;
  //   if (this.quesData[pos]) {
  //     this.option = true;
  //   }
  //   this.checkResult();
  // }

  // checkResult() {
  //   var correctAns: any = 0, incorrectAns: any = 0, x = 0;
  //   x = this.quesData.length;
  //   for (var i in this.quesData) {
  //     if (this.quesData[i].userans == this.quesData[i].answer) {
  //       correctAns++;
  //       this.correct = correctAns;
  //       localStorage.setItem('Correct Answer', this.correct = correctAns);
  //       let singleMarks = this.quesData[0].quiz.maxMarks/this.quesData.length;
  //       console.log(singleMarks)
  //       localStorage.setItem('marks got', this.marksGot += singleMarks);
  //     }
  //     else {
  //       incorrectAns++;
  //       this.incorrect = incorrectAns;
  //       localStorage.setItem('Incorrect Answer', this.incorrect = incorrectAns)
  //     }
  //   }
  // }

  // nextQns() {
  //   this.checkResult();
  //   this.qnsCount++;
  //   this.option = false;
  //   if (this.qnsCount == this.arrayLength) {
  //     this.marks = true;
  //     this.next = true;
  //     this.quesData.sort(() => 0.5 - Math.random());
  //   }
  // }
  // prevQns(){
  //   if(this.qnsCount>0){
  //     this.qnsCount--;
  //   }
  // }
  OnPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.quesData.length) {
      endIndex = this.quesData.length;
    }
    this.pageSlice = this.quesData.slice(startIndex, endIndex);
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    })
  }
  onRightClick() {
    event?.preventDefault();
    alert('Right click is disabled.!!!')
  }

}
