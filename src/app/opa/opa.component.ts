import { Component, OnInit } from '@angular/core';
import { Tenant,Path } from '../tenants';


@Component({
  selector: 'app-opa',
  templateUrl: './opa.component.html',
  styleUrls: ['./opa.component.less']
})
@Tenant("default")
@Path("GGGG")
export class OpaComponent implements OnInit {

  public someText:string;
  constructor() { 
    this.someText="Default Implementation";

  }

  ngOnInit() {
  }

}
