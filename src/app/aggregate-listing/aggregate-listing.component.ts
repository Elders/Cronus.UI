import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import {AggregateServiceService} from '../services/aggregate-service.service';
import {IResults} from '../services/infra';
import {IAggregate} from '../services/infra';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate-listing.component.html',
  styleUrls: ['./aggregate-listing.component.less'],
  providers: [AggregateServiceService]
})
export class AggregateListingComponent implements OnInit {
  results: IResults;
  public router: Router;
  public aggregateNumber: number;
  public show: boolean;
  public aggrId: string;
  public url: string;

  constructor(
      public r: Router,
      public aggrService: AggregateServiceService) {
      this.show = false;
      this.router = r;
   }

  ngOnInit () {
    this.getAggregate();
  }

  check () {
    console.log(this.aggrId);
  };
   
  getAggregate (){
      this.aggrService.getAggregates().subscribe(x => {
          this.results = x;
          console.log(this.results);
      });
  }
  getAggregateId (url: string, id: string){
     this.aggrService.getAggregatesId(url, id).subscribe(x => {
          this.results = x;
          console.log(this.results);
      });
  }

}
