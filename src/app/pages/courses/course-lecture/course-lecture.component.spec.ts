import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLectureComponent } from './course-lecture.component';

describe('CourseLectureComponent', () => {
  let component: CourseLectureComponent;
  let fixture: ComponentFixture<CourseLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseLectureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
