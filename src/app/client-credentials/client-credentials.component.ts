import { Component, OnInit } from '@angular/core';
import {TokenService} from '../services/token-service';
import { Path } from '../tenants';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-client-credentials',
  templateUrl: './client-credentials.component.html',
  styleUrls: ['./client-credentials.component.less'],
  providers: [TokenService]
})
@Path('clientCredentials')
export class ClientCredentialsComponent implements OnInit {
  private result: any;
  constructor(public tokenService: TokenService) { }

  ngOnInit() {
  }

  authorize(url, clientId, clientSecret) {
    localStorage.removeItem("Token");
    console.log(url, clientId, clientSecret);
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    let credentials = "grant_type=client_credentials" 
    + "&client_id=" + clientId
    + "&client_secret=" + clientSecret
    + "&scope=read"
    + "&scope=write";

    this.tokenService.getToken(url, credentials, headers).subscribe(x => {
      this.result = x;
      localStorage.setItem("Token",this.result.access_token);
    });
  }

}
