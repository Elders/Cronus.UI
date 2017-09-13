import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.less']
})
export class LazyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('asdf');
  }

}
