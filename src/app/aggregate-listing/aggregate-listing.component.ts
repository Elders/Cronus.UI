import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import {AggregateServiceService} from '../services/aggregate-service.service';
import {IResults} from '../services/infra';
import {IAggregate} from '../services/infra';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Path } from '../tenants';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate-listing.component.html',
  styleUrls: ['./aggregate-listing.component.less'],
  providers: [AggregateServiceService]
})
@Path("aggregate")
export class AggregateListingComponent implements OnInit {
  results: IResults;
  public router: Router;
  public aggregateNumber: number;
  public show: boolean;
  public aggrId: string;
  public url: string;
  public loading:boolean = false;  
  public error:boolean = false;  

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
    this.loading = true;
     this.aggrService.getAggregatesId(url, id).subscribe(x => {
          this.results = x;
          this.loading = false;
          console.log(this.results);
          this.error = false;
      },error => {
        this.error = true;
     });
  }

}
