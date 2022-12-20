import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseLectureComponent } from './course-lecture/course-lecture.component';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailComponent,
    CourseLectureComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    YouTubePlayerModule
  ],
  exports:[
    CoursesComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CoursesModule { }
