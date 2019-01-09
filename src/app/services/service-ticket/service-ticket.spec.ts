import { TestBed } from '@angular/core/testing';

import { ServiceTicketService } from './service-ticket.service';

describe('ServiceTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceTicketService = TestBed.get(ServiceTicketService);
    expect(service).toBeTruthy();
  });
});
