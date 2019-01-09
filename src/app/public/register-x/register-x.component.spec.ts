import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterXComponent } from './register-x.component';

describe('RegisterXComponent', () => {
  let component: RegisterXComponent;
  let fixture: ComponentFixture<RegisterXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
