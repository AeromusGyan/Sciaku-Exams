import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AttemptedComponent } from './pages/user/attempted/attempted.component';
import { UsersDetailComponent } from './pages/admin/welcome/users-detail/users-detail.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CoursesModule } from './pages/courses/courses.module';
import { AddCourseVideosComponent } from './pages/admin/courses/add-course-videos/add-course-videos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddCoursesComponent } from './pages/admin/add-courses/add-courses.component';
import { LoginComponent } from './pages/login/login.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AllCoursesComponent } from './pages/admin/courses/all-courses/all-courses.component';
import { AllCourseVideosComponent } from './pages/admin/courses/all-course-videos/all-course-videos.component';
import { UpdateCourseVideoComponent } from './pages/admin/courses/update-course-video/update-course-video.component';
import { UpdateCoursesComponent } from './pages/admin/courses/update-courses/update-courses.component';

@NgModule({
  declarations: [
    AppComponent,NavbarComponent, FooterComponent, SignupComponent,HomeComponent, DashboardComponent,
    UserDashboardComponent,ProfileComponent, SidebarComponent,WelcomeComponent, AddCategoryComponent, ViewCategoriesComponent,
    ViewQuizzesComponent,AddQuizComponent,UpdateQuizComponent, ViewQuizQuestionsComponent,AddQuestionComponent,
    UpdateQuestionComponent,UserSidebarComponent,UserWelcomeComponent,LoadQuizComponent,UserProfileComponent,
    InstructionsComponent,QuizStartComponent,AttemptedComponent,UsersDetailComponent,
    ForgotPasswordComponent,
    AddCourseVideosComponent,AddCoursesComponent,LoginComponent, AllCoursesComponent, AllCourseVideosComponent, UpdateCourseVideoComponent, UpdateCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CKEditorModule,
    YouTubePlayerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    CoursesModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
