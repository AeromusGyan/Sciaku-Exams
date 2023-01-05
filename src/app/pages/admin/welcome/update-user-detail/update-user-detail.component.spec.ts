import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDetailComponent } from './update-user-detail.component';

describe('UpdateUserDetailComponent', () => {
  let component: UpdateUserDetailComponent;
  let fixture: ComponentFixture<UpdateUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
