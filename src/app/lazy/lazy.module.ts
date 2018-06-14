import { NgModule } from '@angular/core';

import { LazyComponent }   from './lazy.component'; 
import { MultitenantModule } from '../tenants';
import {LazyPruvitComponent} from './lazy-pruvit.component';
import { Routes, RouterModule } from '@angular/router'; 
import {LazyBod} from './lazy-bodhd.component';
import {MultitenantService } from '../tenants';

var components= [LazyComponent,LazyPruvitComponent,LazyBod];
var routes=[];
MultitenantService.getRoutes().forEach(x=>{
    var hasPath=x.path||x.path==""; 
    if(hasPath && components.indexOf(x.component)>-1){
        routes.push({
            path:x.path,
            component:x.component
        })
    }
});

console.log("aaaaaaa",routes);
// const appRoutes: Routes = [
//     {
//         path:'home',
//         component: HomePageComponent
//     },
//     {
//         path:'aggregate',
//         component: AggregateListingComponent
//     },
//     {
//         path: 'about',
//         component: AboutComponent
//     },
//     {
//         path: 'projections',
//         component: ProjectionListingComponent
//     },
//     {
//         path: 'projections/:url/:id',
//         component: ProjectionDetailComponent
//     },
    
// ];

var routing: ModuleWithProviders = RouterModule.forChild(routes);

@MultitenantModule
@NgModule({
  imports: [routing],
  declarations: components
})
export class LazyModule {}