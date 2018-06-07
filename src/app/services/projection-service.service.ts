import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IResults} from './infra';
import {Post} from './infra';
//NOTE TOSELF USE HttpClient instead of Http since its improved (if you are using Angular 4.3 or above)
@Injectable()
export class ProjectionServiceService {
  test_url = "asdf";
  root_url = 'http://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  getProjections(url: string): Observable<IResults>{
    return this.http.get<IResults>('http://' + url + '/api/projectionlist');
  }

  getProjectionDetail(url: string, projectionContractId: string, id: string): Observable<IResults>{
    return this.http.get<IResults>('http://' + url + '/api/projection/Explore?ProjectionContractId=' + projectionContractId + '&id=' + id + '');
  }

  getPosts() {
    return this.http.get<Post[]>(`${this.root_url}/posts`);
  }

  multiply(): string {
    return './projection-detail.component.html';
  }


}
