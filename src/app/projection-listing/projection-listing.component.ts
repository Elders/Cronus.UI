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

  constructor(public r: Router, public projService: ProjectionServiceService) { 
    this.router = r;
  }

  ngOnInit() {
  }

  getProjections (url: string){
      this.projService.getProjections(url).subscribe(x => {
        this.results = x;
        console.log(this.results);
     });
  }

  goToProductDetails(id) {
    this.router.navigate(['/projections', id]);
  }

}
