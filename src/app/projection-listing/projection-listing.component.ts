import { Component, OnInit } from '@angular/core';
import {ProjectionServiceService} from '../services/projection-service.service';
import {IResults} from '../services/infra';
import {IProjections} from '../services/infra';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-projection-listing',
  templateUrl: './projection-listing.component.html',
  styleUrls: ['./projection-listing.component.less'],
  providers: [ProjectionServiceService]
})
export class ProjectionListingComponent implements OnInit {
  results: IResults;
  public router: Router;
  public url: string;
  public p: number = 1;
  public loading:boolean = false;
  public error:boolean = false;

  constructor(public r: Router, public projService: ProjectionServiceService) { 
    this.router = r;
  }

  ngOnInit() {
    if(localStorage.getItem("projectionResult")){
      var projectionResult = localStorage.getItem("projectionResult");
      this.results = JSON.parse(projectionResult);
      
    }
    if(localStorage.getItem("projectionUrl")){
      this.url = localStorage.getItem("projectionUrl");
    }
  }

  getProjections (url: string){
      this.loading = true;
      this.projService.getProjections(url).subscribe(x => {
        this.results = x;
        this.loading = false;
        console.log(this.results);
        localStorage.setItem('projectionResult', JSON.stringify(this.results));
        localStorage.setItem('projectionUrl', url);
        this.error = false;
     },
      error => {
      this.error = true;
   });
  }

  goToProductDetails(id) {
    this.router.navigate(['/projections', id]);
  }

}
