import { Component, OnInit } from '@angular/core';
import {ProjectionServiceService} from '../services/projection-service.service';
import {IResults, IProjection} from '../services/infra';
import {IProjections} from '../services/infra';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Path } from '../tenants';

@Component({
  selector: 'app-projection-detail',
  templateUrl: './projection-detail.component.html',
  styleUrls: ['./projection-detail.component.less'],
  providers: [ProjectionServiceService]
})
@Path('projections/:url/:id/:hash/:status/:revision')
export class ProjectionDetailComponent implements OnInit {
  results: IResults;
  public router: Router;
  public url: string;
  public hash: string;
  public projectionContractId: string;
  public id: string;
  public status: string;
  public revision: number;
  public loading:boolean = false;
  public error:boolean = false;
  public canQuery: boolean;
  public canRebuild: boolean;

  constructor(public r: Router, public projService: ProjectionServiceService, public activatedRoute: ActivatedRoute) { 
    this.router = r;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.url = params['url'];
      this.projectionContractId = params['id'];
      this.hash = params['hash'];
      this.status = params['status'];
      this.revision = params['revision'];

      console.log(this.url);
      console.log(this.projectionContractId);
      this.projService.getProjectionMeta(this.url, this.projectionContractId).subscribe(x => {
        this.error = x.isSuccess == false;

        if (x.isSuccess) {
          var projection = x.result;
          this.canQuery = projection.versions.find(x => x.status == 'live' && x.hash == this.hash) != null;
          var liveRevision:number = projection.versions.find(x => x.status == 'live').revision;
          var currentHashLatestRevision:number = projection.versions.filter(x => x.hash == this.hash).sort((a, b) =>b.revision - a.revision)[0].revision;
          console.log(currentHashLatestRevision);
          console.log(liveRevision);
          
          this.canRebuild = currentHashLatestRevision >= liveRevision;
        }
      }, () => this.error = true);
    });
  }

  getProjectionDetail (id: string) {
    this.loading = true;
    this.projService.getProjectionDetail(this.url, this.projectionContractId,id).subscribe(x => {
      this.results = x;
      this.loading = false;
      console.log(this.results);
      this.error = false;
   }, () => this.error = true);
  }

  rebuildProjection() {
    this.loading = true;
    this.projService.rebuildProjection(this.url, this.projectionContractId, this.hash).subscribe(x => {
      this.loading = false;
      this.error = x.isSuccess == false;
   }, () => this.error = true);
  }

  cancelProjection() {
    this.loading = true;
    this.projService.cancelRebuildingProjection(this.url, this.projectionContractId, { hash: this.hash, revision: this.revision, status: this.status }, null ).subscribe(x => {
      this.loading = false;
      this.error = x.isSuccess == false;
   }, () => this.error = true);
  }
}
