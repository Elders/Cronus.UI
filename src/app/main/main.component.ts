import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'main',
  host: {"class": "main"},
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
