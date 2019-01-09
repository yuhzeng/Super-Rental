import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPageCardComponent } from './community-page-card.component';

describe('CommunityPageCardComponent', () => {
  let component: CommunityPageCardComponent;
  let fixture: ComponentFixture<CommunityPageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityPageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
