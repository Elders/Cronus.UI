import { TestBed, inject } from '@angular/core/testing';

import { ProjectionServiceService } from './projection-service.service';

describe('ProjectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectionServiceService]
    });
  });

  it('should be created', inject([ProjectionServiceService], (service: ProjectionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
