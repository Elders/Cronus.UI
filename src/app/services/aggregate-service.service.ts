import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IResults} from './infra';
import { HttpClient} from '@angular/common/http';
//NOTE TOSELF USE HttpClient instead of Http since its improved (if you are using Angular 4.3 or above) check the projections service for reference
@Injectable()
export class AggregateServiceService {

  constructor(private http: HttpClient) { }

  getAggregates(): Observable<IResults>{
    return this.http.get<IResults>('http://192.168.10.160:9000/api/EventStore/explore?id=urn:mv:ticket:01f5a448-a08e-45bc-85ff-a57824835810');
  }

  getAggregatesId(url: string, id: string): Observable<IResults>{
    return this.http.get<IResults>('http://' + url + '/api/EventStore/explore?id=' + id);
  }
}
