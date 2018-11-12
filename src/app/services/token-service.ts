import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IResults} from './infra';
import { HttpClient} from '@angular/common/http';
//NOTE TOSELF USE HttpClient instead of Http since its improved (if you are using Angular 4.3 or above) check the projections service for reference
@Injectable()
export class TokenService {

  constructor(private http: HttpClient) { }

  getToken(url: string, credentials: any, headers:any): Observable<any> {
    return this.http.post<any>(url, credentials, { headers: headers });
  }
}
