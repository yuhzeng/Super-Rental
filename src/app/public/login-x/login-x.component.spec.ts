import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginXComponent } from './login-x.component';

describe('LoginXComponent', () => {
  let component: LoginXComponent;
  let fixture: ComponentFixture<LoginXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
