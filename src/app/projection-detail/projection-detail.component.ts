import { Component, OnInit } from '@angular/core';
import {ProjectionServiceService} from '../services/projection-service.service';
import {IResults} from '../services/infra';
import {IProjections} from '../services/infra';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-projection-detail',
  templateUrl: './projection-detail.component.html',
  styleUrls: ['./projection-detail.component.less'],
  providers: [ProjectionServiceService]
})
export class ProjectionDetailComponent implements OnInit {
  results: IResults;
  public router: Router;
  public url: string;
  public projectionContractId: string;
  public id: string;

  constructor(public r: Router, public projService: ProjectionServiceService, public activatedRoute: ActivatedRoute) { 
    this.router = r;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.url = params['url'];
      this.projectionContractId = params['id'];
      console.log(this.url);
      console.log(this.projectionContractId);
    });
  }

  getProjectionDetail (id: string) {
    this.projService.getProjectionDetail(this.url, this.projectionContractId,id).subscribe(x => {
      this.results = x;
      console.log(this.results);
   });
  }

}
