import { TestBed, inject } from '@angular/core/testing';

import { AggregateServiceService } from './aggregate-service.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

describe('AggregateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, HttpClientModule ],
      providers: [AggregateServiceService]
    });
  });

  it('should be created', inject([AggregateServiceService], (service: AggregateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
