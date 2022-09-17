import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptedComponent } from './attempted.component';

describe('AttemptedComponent', () => {
  let component: AttemptedComponent;
  let fixture: ComponentFixture<AttemptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
