import { TestBed } from '@angular/core/testing';

import { AuthXService } from './auth-x.service';

describe('AuthXService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthXService = TestBed.get(AuthXService);
    expect(service).toBeTruthy();
  });
});
