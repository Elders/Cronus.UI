import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ProjectionServiceService } from './projection-service.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import {IResults} from './infra';

describe('ProjectionServiceService', () => {

  let service: ProjectionServiceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [  HttpModule, HttpClientTestingModule ],
      providers: [ProjectionServiceService]
    });

    service = TestBed.get(ProjectionServiceService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get projections via GET', () => {
    const dummyData: IResults = { "result": { "projections": [{ "projectionContractId": "6fd97755-c98a-43b4-822d-268066900cf9", "projectionName": "PersistentProjectionVersionHandler", "versions": [{ "hash": "jkvskw", "revision": "1", "status": "live" }] }] }, "isSuccess": true }; 
    const dummyUrl: string = 'asdf';
    
      service.getProjections(dummyUrl).subscribe(value => {
        console.log(value);
        const request = httpMock.expectOne('http://' + dummyUrl + '/api/projectionlist');
        expect(request.request.method).toBe('GET');
        request.flush(dummyData);
        expect(value).toEqual(dummyData);
        expect(value.result.projections[0].projectionContractId).toBe("6fd97755-c98a-43b4-822d-268066900cf9");
      });
  });
});
  