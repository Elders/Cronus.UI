import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IResults} from './infra';

@Injectable()
export class AggregateServiceService {

  constructor(private http: Http) { }

  getAggregates(): Observable<IResults>{
    return this.http.get('http://192.168.10.160:9000/api/EventStore/explore?id=urn:mv:ticket:01f5a448-a08e-45bc-85ff-a57824835810')
               .map(res =>res.json() as IResults);
  }

  getAggregatesId(url: string, id: string): Observable<IResults>{
    return this.http.get('http://' + url + '/api/EventStore/explore?id=' + id)
               .map(res =>res.json() as IResults);
  }
}
