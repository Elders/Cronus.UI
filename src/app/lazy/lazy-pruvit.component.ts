import { Component, OnInit } from '@angular/core';
import { Tenant,Path } from '../tenants';

@Tenant('pruvit')
@Component({
  selector: 'aaaaaaa',
  template: '<h2>Pruvit AAAAAA</h2>',
  styleUrls: ['./lazy.component.less']
}) 

export class LazyPruvitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('POPPOOPOP');
  }

}
