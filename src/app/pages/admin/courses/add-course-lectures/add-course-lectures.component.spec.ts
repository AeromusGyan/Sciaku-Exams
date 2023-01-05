import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseLecturesComponent } from './add-course-lectures.component';

describe('AddCourseLecturesComponent', () => {
  let component: AddCourseLecturesComponent;
  let fixture: ComponentFixture<AddCourseLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseLecturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
