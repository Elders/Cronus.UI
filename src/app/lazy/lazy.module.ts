import { NgModule, ModuleWithProviders } from '@angular/core';

import { LazyComponent }   from './lazy.component'; 
import { MultitenantModule,MultitenantLazyModule } from '../tenants';
//import {LazyPruvitComponent} from './lazy-pruvit.component';
import { Routes, RouterModule } from '@angular/router'; 
//import {LazyBod} from './lazy-bodhd.component';


@MultitenantLazyModule
@NgModule({
  imports: [],
  declarations:  [LazyComponent]
})
export class LazyModule {}