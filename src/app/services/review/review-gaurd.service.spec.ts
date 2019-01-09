import { TestBed } from '@angular/core/testing';

import { ReviewGaurdService } from './review-gaurd.service';

describe('ReviewGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewGaurdService = TestBed.get(ReviewGaurdService);
    expect(service).toBeTruthy();
  });
});
