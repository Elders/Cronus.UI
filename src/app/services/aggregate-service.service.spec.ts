import { TestBed, inject } from '@angular/core/testing';

import { AggregateServiceService } from './aggregate-service.service';

describe('AggregateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregateServiceService]
    });
  });

  it('should be created', inject([AggregateServiceService], (service: AggregateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
