import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaseComponent } from './edit-lease.component';

describe('EditLeaseComponent', () => {
  let component: EditLeaseComponent;
  let fixture: ComponentFixture<EditLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
