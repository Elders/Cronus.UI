import { Component, OnInit } from '@angular/core';
import { Tenant,Path } from '../tenants';
import { OpaComponent } from '../opa/opa.component';


@Component({
  selector: 'app-opa',
  templateUrl: './opa-pruvit.component.html',
  styleUrls: ['./opa-pruvit.component.less']
})
@Tenant("pruvit")
@Path("GGGG")
export class OpaPruvitComponent extends OpaComponent {

  constructor() { super() }

  ngOnInit() {
  }

}
