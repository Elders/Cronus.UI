import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ProjectionServiceService } from './projection-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { IResults } from './infra';
import { Post } from './infra';

describe('ProjectionServiceService', () => {

  let service: ProjectionServiceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, HttpClientTestingModule],
      providers: [ProjectionServiceService]
    });

    service = TestBed.get(ProjectionServiceService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get projections via GET', () => {
    const dummyData: IResults = { "result": { "projections": [{ "projectionContractId": "6fd97755-c98a-43b4-822d-268066900cf9", "projectionName": "PersistentProjectionVersionHandler", "versions": [{ "hash": "jkvskw", "revision": "1", "status": "live" }] }] }, "isSuccess": true };
    const dummyUrl: string = 'asdf';

    service.getProjections(dummyUrl).subscribe(value => {
      expect(value).toEqual(dummyData);
      expect(value.result.projections[0].projectionContractId).toBe("6fd97755-c98a-43b4-822d-268066900cf9");
    });

    const request = httpMock.expectOne(`http://${service.test_url}/projectionlist`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get books via GET', () => {
    const dummyPosts: Post[] = [
      { userId: '1', id: 1, body: 'Asdf', title: 'ko' },
      { userId: '2', id: 2, body: 'Asdf2', title: 'ne' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
      expect(posts[0].title).toBe("ko");
    });

    const request = httpMock.expectOne(`${service.root_url}/posts`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);

  });

  //it('multiply', () => {

  //var xx = service.multiply(5,5);
  //expect(xx).toBe(25);


  //});


});

