import { Component } from '@angular/core';
import { Path } from '../tenants';

@Component({
  moduleId: module.id,
  selector: 'about',
  templateUrl: 'about.component.html',
})
@Path("about")
export class AboutComponent  {
    header_title: string;

    constructor(){
      this.header_title = "This is an about page!"
    }
    
 }
