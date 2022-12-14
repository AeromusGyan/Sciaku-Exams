import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

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
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AttemptedComponent } from './pages/user/attempted/attempted.component';
import { UsersDetailComponent } from './pages/admin/welcome/users-detail/users-detail.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CoursesModule } from './pages/courses/courses.module';
import { AddCourseVideosComponent } from './pages/admin/courses/add-course-videos/add-course-videos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddCoursesComponent } from './pages/admin/courses/add-courses/add-courses.component';
import { LoginComponent } from './pages/login/login.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AllCoursesComponent } from './pages/admin/courses/all-courses/all-courses.component';
import { AllCourseVideosComponent } from './pages/admin/courses/all-course-videos/all-course-videos.component';
import { UpdateCourseVideoComponent } from './pages/admin/courses/update-course-video/update-course-video.component';
import { UpdateCoursesComponent } from './pages/admin/courses/update-courses/update-courses.component';
import { Page404Component } from './pages/page404/page404.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { AddCourseLecturesComponent } from './pages/admin/courses/add-course-lectures/add-course-lectures.component';
import { AllCourseLecturesComponent } from './pages/admin/courses/all-course-lectures/all-course-lectures.component';
import { UpdateUserDetailComponent } from './pages/admin/welcome/update-user-detail/update-user-detail.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ImagesComponent } from './components/testing/images/images.component';
import { ViewBooksComponent } from './pages/books/view-books/view-books.component';
import { AddBooksComponent } from './pages/admin/books/add-books/add-books.component';
import { AllBooksComponent } from './pages/admin/books/all-books/all-books.component';

const googleLoginOptions = {
  scope: 'profile email',
  plugin_name:'sciaku' //can be any name
}; 
@NgModule({
  declarations: [
    AppComponent,NavbarComponent, FooterComponent, SignupComponent,HomeComponent, DashboardComponent,
    UserDashboardComponent,ProfileComponent, SidebarComponent,WelcomeComponent, AddCategoryComponent, ViewCategoriesComponent,
    ViewQuizzesComponent,AddQuizComponent,UpdateQuizComponent, ViewQuizQuestionsComponent,AddQuestionComponent,
    UpdateQuestionComponent,UserSidebarComponent,UserWelcomeComponent,LoadQuizComponent,
    InstructionsComponent,QuizStartComponent,AttemptedComponent,UsersDetailComponent,
    ForgotPasswordComponent,
    AddCourseVideosComponent,AddCoursesComponent,LoginComponent, AllCoursesComponent, AllCourseVideosComponent, UpdateCourseVideoComponent, UpdateCoursesComponent, Page404Component, ResumeComponent, AboutComponent, ContactComponent, TermsConditionComponent, AddCourseLecturesComponent, AllCourseLecturesComponent, UpdateUserDetailComponent, EditProfileComponent, ImagesComponent, ViewBooksComponent, AddBooksComponent, AllBooksComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    CoursesModule,
    SocialLoginModule
  ],
  providers: [authInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '705688298209-cfs2mkq5l1ialnj9tga0e227sivvvd85.apps.googleusercontent.com',
              googleLoginOptions
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
