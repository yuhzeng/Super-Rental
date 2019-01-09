import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesLeaseComponent } from './amenities.component';

describe('AmenitiesLeaseComponent', () => {
  let component: AmenitiesLeaseComponent;
  let fixture: ComponentFixture<AmenitiesLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesLeaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
