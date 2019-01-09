import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTimeComponent } from './appointment-time.component';

describe('AppointmentTimeComponent', () => {
  let component: AppointmentTimeComponent;
  let fixture: ComponentFixture<AppointmentTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
