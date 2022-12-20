import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseVideoComponent } from './update-course-video.component';

describe('UpdateCourseVideoComponent', () => {
  let component: UpdateCourseVideoComponent;
  let fixture: ComponentFixture<UpdateCourseVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCourseVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCourseVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
