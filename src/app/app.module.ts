import { NgModule, Pipe, PipeTransform }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent }  from './app.component';
import { AboutComponent }  from './components/about.component';
import {routing} from './app.routing';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { SiteHeaderTopComponent } from './site-header-top/site-header-top.component';
import { LeftSidebarMenuComponent } from './left-sidebar-menu/left-sidebar-menu.component';
import { MainComponent } from './main/main.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LazyComponent } from './lazy/lazy.component';
import { AggregateListingComponent } from './aggregate-listing/aggregate-listing.component';
import { ProjectionListingComponent } from './projection-listing/projection-listing.component';
import { ProjectionDetailComponent } from './projection-detail/projection-detail.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing, Angular2FontawesomeModule, NgxPaginationModule ],
  declarations: [ AppComponent, AboutComponent, SiteHeaderTopComponent, LeftSidebarMenuComponent, MainComponent, HomePageComponent, AggregateListingComponent, ProjectionListingComponent, ProjectionDetailComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
