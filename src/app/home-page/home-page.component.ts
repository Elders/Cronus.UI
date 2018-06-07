import { Component, OnInit } from '@angular/core';
import { Tenant,Path } from '../tenants';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
}) 
@Path("home")
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
