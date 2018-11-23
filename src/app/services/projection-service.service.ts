import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IResult, IResults, IProjection, IProjectionVersion } from './infra';
import { Post } from './infra';
import { version } from 'punycode';
//NOTE TOSELF USE HttpClient instead of Http since its improved (if you are using Angular 4.3 or above)
@Injectable()
export class ProjectionServiceService {
  test_url = "asdf";
  root_url = 'http://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  getProjections(url: string): Observable<IResults> {
    return this.http.get<IResults>('http://' + url + '/projections');
  }

  getProjectionDetail(url: string, projectionContractId: string, id: string): Observable<IResults> {
    return this.http.get<IResults>('http://' + url + '/projection/Explore?ProjectionName=' + projectionContractId + '&id=' + id + '');
  }

  getProjectionMeta(url: string, projectionContractId: string): Observable<IResult<IProjection>> {
    return this.http.get<IResult<IProjection>>('http://' + url + '/projection/meta?ProjectionContractId=' + projectionContractId);
  }

  getPosts() {
    return this.http.get<Post[]>(`${this.root_url}/posts`);
  }

  rebuildProjection(url: string, projectionContractId: string, hash: string): Observable<IResult<any>> {
    return this.http.post<IResult<any>>('http://' + url + '/Projection/Rebuild', { projectionContractId: projectionContractId, hash: hash });
  }

  cancelRebuildingProjection(url: string, projectionContractId: string, version: IProjectionVersion, reason: string): Observable<IResult<any>> {
    return this.http.post<IResult<any>>('http://' + url + '/Projection/Cancel', { projectionContractId: projectionContractId, version: version, reason: reason });
  }

  multiply(first: number, second: number) {
    return first * second;
  }
}
