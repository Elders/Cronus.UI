
import { Component, OnInit, TypeDecorator, Directive } from '@angular/core';
import {ProjectionServiceService} from '../services/projection-service.service';
import {IResults} from '../services/infra';
import {IProjections} from '../services/infra';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import {Tenant, Path,Route} from '../tenants';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';


@Component({
  selector: 'app-projection-listing',
  
  templateUrl:  './projection-listing.component.html',
  styleUrls: ['./projection-listing.component.less'],
  providers: [ProjectionServiceService]
})  
@Path("projections") 
 class ProjectionListingComponent implements OnInit {
  results: IResults;
  public router: Router;
  public url: string;
  public label: string = '';
  public p: number = 1;
  public loading:boolean = false;
  public error:boolean = false;
  public selector: string = "app-projection-listing";
  public dataService: CompleterData;
  public searchData = [];
  
  constructor(public r: Router, public projService: ProjectionServiceService, public completerService: CompleterService) { 
    this.router = r;
    if(localStorage.getItem("savedProjectionUrl")) {
      this.searchData = JSON.parse(localStorage.getItem("savedProjectionUrl"));
      console.log(this.searchData);
    }
    this.dataService = completerService.local(this.searchData, 'value','value');
  }

  ngOnInit() {
    if(localStorage.getItem("projectionUrl")){
      this.url = localStorage.getItem("projectionUrl");
      this.getProjections(this.url,this.label);
    }
  }

  getProjections (url: string, label:string) {
      this.loading = true;
      var escUrl;
      if(url.indexOf(':label-') > -1){
        escUrl = url.split(':label-')[0];
          this.projService.getProjections(escUrl).subscribe(x => {
            this.results = x;
            this.loading = false;
            console.log(this.results);
            
            this.error = false;
          
            if (this.searchData.some(e => e.url == escUrl || e.url == this.url)) {
            }
            else {
              this.searchData.push({url: escUrl,value: url + ':label-' + label});
              localStorage.setItem("savedProjectionUrl", JSON.stringify(this.searchData));
            }
            localStorage.setItem('projectionUrl', escUrl);
        },
          error => {
          this.error = true;
      });
    }
    else {
      this.projService.getProjections(url).subscribe(x => {
        this.results = x;
        this.loading = false;
        console.log(this.results);
        
        this.error = false;
      
        if (this.searchData.some(e => e.url == url || e.url == this.url)) {
        }
        else {
          this.searchData.push({url: url,value: url + ':label-' + label});
          localStorage.setItem("savedProjectionUrl", JSON.stringify(this.searchData));
        }
        localStorage.setItem('projectionUrl', url);
      },
        error => {
        this.error = true;
      });
    }
      
  }

  goToProductDetails(id) {
    this.router.navigate(['/projections', id]);
  }

  clearProjections() {
    localStorage.removeItem("savedProjectionUrl");
    localStorage.removeItem("projectionUrl");
  }

  deleteProjection(url: string) {
    var escUrl;
    if (window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS URL BOY?'))
    {
      if(url.indexOf(':label-') > -1){
        escUrl = url.split(':label-')[0];
  
        for (var i = 0; i < this.searchData.length; i++)
        {
            if (this.searchData[i].url == escUrl)
            {
              this.searchData.splice(i, 1);
              localStorage.setItem("savedProjectionUrl", JSON.stringify(this.searchData));
              localStorage.removeItem("projectionUrl");
                break;
            }
        }
      }
      else {
        for (var i = 0; i < this.searchData.length; i++)
        {
            if (this.searchData[i].url == url)
            {
              this.searchData.splice(i, 1);
              localStorage.setItem("savedProjectionUrl", JSON.stringify(this.searchData));
              localStorage.removeItem("projectionUrl");
                break;
            }
        }
      }
      
    this.url='';
    }
    else
    {
        return false;
    }
    
  }
  onItemSelect(selected:CompleterItem){
    if(selected)
     this.url = selected.originalObject.url;
    }
  
}
 
export {ProjectionListingComponent};