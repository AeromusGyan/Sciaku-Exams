import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddCoursesComponent } from './pages/admin/courses/add-courses/add-courses.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AddCourseVideosComponent } from './pages/admin/courses/add-course-videos/add-course-videos.component';
import { AllCourseVideosComponent } from './pages/admin/courses/all-course-videos/all-course-videos.component';
import { AllCoursesComponent } from './pages/admin/courses/all-courses/all-courses.component';
import { UpdateCourseVideoComponent } from './pages/admin/courses/update-course-video/update-course-video.component';
import { UpdateCoursesComponent } from './pages/admin/courses/update-courses/update-courses.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { UsersDetailComponent } from './pages/admin/welcome/users-detail/users-detail.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { CourseDetailComponent } from './pages/courses/course-detail/course-detail.component';
import { CourseLectureComponent } from './pages/courses/course-lecture/course-lecture.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AttemptedComponent } from './pages/user/attempted/attempted.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
// import { AddCourseLecturesComponent } from './pages/admin/courses/add-course-lectures/add-course-lectures.component';
// import { AllCourseLecturesComponent } from './pages/admin/courses/all-course-lectures/all-course-lectures.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ImagesComponent } from './components/testing/images/images.component';
import { ViewBooksComponent } from './pages/books/view-books/view-books.component';
import { AddBooksComponent } from './pages/admin/books/add-books/add-books.component';
import { AllBooksComponent } from './pages/admin/books/all-books/all-books.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'forgot', component: ForgotPasswordComponent, pathMatch: 'full' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent, pathMatch: 'full' },
  { path: 'courses/course-details/:url/:cid', component: CourseDetailComponent, pathMatch: 'full' },
  { path: 'image', component: ImagesComponent, data: { 'title': 'Images upload testing' } },
  { path: 'courses/course-lectures/:title/:cid/:id', component: CourseLectureComponent, canActivate: [UserGuard] },
  {path: 'books', component:ViewBooksComponent, pathMatch:'full'},
  {
    path: 'profile', component: ProfileComponent, canActivate: [UserGuard],
    children: [
      { path: 'edit', component: EditProfileComponent }
    ]
  },
  { path: 'myresume', component: ResumeComponent, pathMatch: 'full' },
  { path: 'about-us', component: AboutComponent, pathMatch: 'full' },
  { path: 'contact-us', component: ContactComponent, pathMatch: 'full' },
  { path: 'terms-conditions', component: TermsConditionComponent, pathMatch: 'full' },

  {
    path: 'admin', component: DashboardComponent, canActivate: [AdminGuard],
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'categories', component: ViewCategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'quizzes', component: ViewQuizzesComponent },
      { path: 'add-quiz', component: AddQuizComponent },
      { path: 'quiz/:qid', component: UpdateQuizComponent },
      { path: 'questions/:id/:title', component: ViewQuizQuestionsComponent },
      { path: 'add-question/:id/:title', component: AddQuestionComponent },
      { path: 'update-question/:id/:title', component: UpdateQuestionComponent },
      { path: 'users-detail', component: UsersDetailComponent },
      { path: 'add-courses', component: AddCoursesComponent },
      { path: 'all-courses', component: AllCoursesComponent },
      // {path:'add-course-lectures/:id/:title', component:AddCourseLecturesComponent},
      // {path:'all-course-lectures/:id/:title', component:AllCourseLecturesComponent},
      { path: 'add-course-video/:title/:id', component: AddCourseVideosComponent },
      { path: 'course-lectures/:title/:id', component: AllCourseVideosComponent },
      { path: 'update-course-video/:title/:id', component: UpdateCourseVideoComponent },
      { path: 'update-courses/:cid', component: UpdateCoursesComponent },
      { path:'add-books', component:AddBooksComponent},
      { path:'all-books', component:AllBooksComponent},

    ]
  },

  {
    path: 'quizzes', component: UserDashboardComponent, canActivate: [UserGuard],
    children: [
      { path: '', component: UserWelcomeComponent },
      { path: ':title/:catId', component: LoadQuizComponent },
      { path: 'instructins/:quiz/:qid', component: InstructionsComponent },
      { path: 'pan/results/attempted', component: AttemptedComponent }

      // {path:'profile', component:UserProfileComponent},
    ]
  },
  { path: 'quiz/start/:qtitle/:qid', component: QuizStartComponent, canActivate: [UserGuard] },
  { path: '**', component: Page404Component, data: { 'title': '404 page' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
