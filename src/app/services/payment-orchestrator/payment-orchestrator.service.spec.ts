import { TestBed } from '@angular/core/testing';

import { PaymentOrchestratorService } from './payment-orchestrator.service';

describe('PaymentOrchestratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentOrchestratorService = TestBed.get(PaymentOrchestratorService);
    expect(service).toBeTruthy();
  });
});
