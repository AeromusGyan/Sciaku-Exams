import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourseVideosComponent } from './all-course-videos.component';

describe('AllCourseVideosComponent', () => {
  let component: AllCourseVideosComponent;
  let fixture: ComponentFixture<AllCourseVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCourseVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCourseVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
