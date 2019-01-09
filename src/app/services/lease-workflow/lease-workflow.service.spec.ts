import { TestBed } from '@angular/core/testing';

import { LeaseWorkflowService } from './lease-workflow.service';

describe('LeaseWorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaseWorkflowService = TestBed.get(LeaseWorkflowService);
    expect(service).toBeTruthy();
  });
});
