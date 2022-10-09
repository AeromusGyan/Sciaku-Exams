import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { UsersDetailComponent } from './pages/admin/welcome/users-detail/users-detail.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AttemptedComponent } from './pages/user/attempted/attempted.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';

const routes: Routes = [
  {path:'', component:HomeComponent,pathMatch:'full'},
  {path:'signup', component:SignupComponent,pathMatch:'full'},
  {path:'login', component:LoginComponent,pathMatch:'full'},
  {path:'forgot', component:ForgotPasswordComponent,pathMatch:'full'},
  {path:'admin', component:DashboardComponent,canActivate:[AdminGuard],
  children:[
    {path:'', component:WelcomeComponent},
    {path:'profile', component:ProfileComponent},
    {path:'categories', component:ViewCategoriesComponent},
    {path:'add-category', component:AddCategoryComponent},
    {path:'quizzes', component:ViewQuizzesComponent},
    {path:'add-quiz', component:AddQuizComponent},
    {path:'quiz/:qid',component:UpdateQuizComponent},
    {path:'questions/:id/:title', component:ViewQuizQuestionsComponent},
    {path:'add-question/:id/:title', component:AddQuestionComponent},
    {path:'update-question/:id/:title', component:UpdateQuestionComponent},
    {path:'users-detail', component:UsersDetailComponent}
  ]},

  {path:'user', component:UserDashboardComponent, canActivate:[UserGuard],
  children:[
    {path:'', component:UserWelcomeComponent},
    {path:':catId', component:LoadQuizComponent},
    {path:'pan/profile', component:ProfileComponent},
    {path:'instructins/:qid', component:InstructionsComponent},
    {path:'pan/attempted', component:AttemptedComponent}
    
    // {path:'profile', component:UserProfileComponent},
  ]
},
  {path:'start/:qid', component:QuizStartComponent, canActivate:[UserGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
