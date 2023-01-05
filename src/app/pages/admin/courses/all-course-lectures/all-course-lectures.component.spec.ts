import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourseLecturesComponent } from './all-course-lectures.component';

describe('AllCourseLecturesComponent', () => {
  let component: AllCourseLecturesComponent;
  let fixture: ComponentFixture<AllCourseLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCourseLecturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCourseLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
