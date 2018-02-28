import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IResults} from './infra';

@Injectable()
export class ProjectionServiceService {

  constructor(private http: Http) { }

  getProjections(url: string): Observable<IResults>{
    return this.http.get('http://' + url + '/api/projectionlist')
               .map(res =>res.json() as IResults);
  }

  getProjectionDetail(url: string, projectionContractId: string, id: string): Observable<IResults>{
    return this.http.get('http://' + url + '/api/projection/Explore?ProjectionContractId=' + projectionContractId + '&id=' + id + '')
               .map(res =>res.json() as IResults);
  }

}
