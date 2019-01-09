import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotXComponent } from './forgot-x.component';

describe('ForgotXComponent', () => {
  let component: ForgotXComponent;
  let fixture: ComponentFixture<ForgotXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
