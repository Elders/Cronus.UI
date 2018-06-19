import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { HttpClientModule} from '@angular/common/http';
import { NgModule, Pipe, PipeTransform }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent }  from './app.component';
import { AboutComponent }  from './components/about.component'; 
import { SiteHeaderTopComponent } from './site-header-top/site-header-top.component';
import { LeftSidebarMenuComponent } from './left-sidebar-menu/left-sidebar-menu.component';
import { MainComponent } from './main/main.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LazyComponent } from './lazy/lazy.component';
import { AggregateListingComponent } from './aggregate-listing/aggregate-listing.component';
import { ProjectionListingComponent } from './projection-listing/projection-listing.component';
import { ProjectionDetailComponent } from './projection-detail/projection-detail.component';
import { ProjectionServiceService } from './services/projection-service.service';
import { MultitenantModule,RegisterChildModule } from './tenants';
import { OpaComponent } from './opa/opa.component';
import { OpaPruvitComponent } from './opa-pruvit/opa-pruvit.component';
@MultitenantModule

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, Angular2FontawesomeModule, NgxPaginationModule, RouterModule, HttpClientModule ],
  declarations: [ AppComponent, AboutComponent, SiteHeaderTopComponent, LeftSidebarMenuComponent, MainComponent, HomePageComponent, AggregateListingComponent, ProjectionListingComponent, ProjectionDetailComponent, OpaComponent, OpaPruvitComponent ],
  providers: [ProjectionServiceService],
  bootstrap:    [ AppComponent ],
  exports: [SiteHeaderTopComponent]
})
@RegisterChildModule({ 
  path: 'lazy',
  loadChildren: './lazy/lazy.module#LazyModule' 
})
export class AppModule { }
 