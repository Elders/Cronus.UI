import { NgModule, ReflectiveInjector } from '@angular/core';
import { Reflection } from './ng-reflection';
import {Routes,Route} from '@angular/router';
import { RouterModule } from '@angular/router';

interface  IMultiTenantService{
  exportChildModule(module:any,ngModule:NgModule);
  exportMainModule(module:any,ngModule:NgModule);
  getTenantByName(name:string):ITenant;
  getCurrentTenant():ITenant;
}
interface ITenant{ 
  registerComponent(component:any);
  getComponents(): any[];
  getName(): string 
} 
function GetComponentId(component:any):string{
  var found = Reflection.getAnnotation(component).filter(x => x.selector)[0]
  if(found)
    return found.selector; 
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function Merge(base:any[], toMerge:any[],getId: any):any[]
{
  var yeild=[];
  var result={};
  var compoenentsToPrefix=[];
  base.forEach(item => { 
   result[getId(item)]=item; 
  });
  toMerge.forEach(item => { 
    result[getId(item)]=item; 
   });
   Object.keys(result).forEach(x=>yeild.push(result[x]));
   return yeild;
}
class NewMultitenantService implements IMultiTenantService{
  
  tenants: ITenant[];
  defaultTenant:ITenant;
  routes: Route[];  

  constructor(){
    this.routes=[];
    this.tenants=[];
    this.defaultTenant=new TenantRegistration(null,"default"); 
    this.tenants.push(this.defaultTenant);
  }
   
  exportMainModule(appmodule:any, ngModule:NgModule){
    var exportedComponents=[];
    var tenant= this.getCurrentTenant();
    ngModule.declarations.forEach(componenet=>
    {
      var tenant= MultiTenantService.getTenantByComponent(componenet) || MultiTenantService.getDefaultTenant(); 
      tenant.registerComponent(componenet); 
    });
    var tenantComponents = Merge(this.defaultTenant.getComponents(), this.getCurrentTenant().getComponents(), x=>GetComponentId(x));
    this.tenants.forEach(t=>t.getComponents().forEach(c=>{
        if(tenantComponents.indexOf(c)==-1)
          this.fixupSelector(c);
       if(ngModule.declarations.indexOf(c)>-1)
        exportedComponents.push(c);
    }));  
    var exportedRoutes=[];
    this.routes.forEach(route => {
      if(!route.component)
      { 
        console.log(route);
        throw "route doesn not have a compnenet" + route;
      }
      else
      {
        if(tenantComponents.indexOf(route.component)>-1 && ngModule.declarations.indexOf(route.component)>-1)
        {
          exportedRoutes.push(route);
        }
      }
    });

      if(appmodule.children)
       { 
        console.log(appmodule.children);
          for(var i = 0;i<appmodule.children.length;i++)
            exportedRoutes.push(appmodule.children[i])
     
       }
      
      ngModule.declarations = exportedComponents.filter(x=>ngModule.declarations.indexOf(x)>-1);
      ngModule.imports.push(RouterModule.forRoot(exportedRoutes))
  }

  exportChildModule(appmodule:any, ngModule:NgModule){
    var exportedComponents=[];
    var tenant= this.getCurrentTenant();
    ngModule.declarations.forEach(componenet=>
    {
      var tenant= MultiTenantService.getTenantByComponent(componenet) || MultiTenantService.getDefaultTenant(); 
      tenant.registerComponent(componenet); 
    });
    var tenantComponents = Merge(this.defaultTenant.getComponents(), this.getCurrentTenant().getComponents(), x=>GetComponentId(x));
    this.tenants.forEach(t=>t.getComponents().forEach(c=>{
        if(tenantComponents.indexOf(c)==-1)
          this.fixupSelector(c);
       if(ngModule.declarations.indexOf(c)>-1)
        exportedComponents.push(c);
    }));  
    var exportedRoutes=[];
    this.routes.forEach(route => {
      if(!route.component)
       {
          console.log(route);
          throw "route doesn not have a compnenet" + route;
       }
      else
      {
        if(tenantComponents.indexOf(route.component)>-1 && ngModule.declarations.indexOf(route.component)>-1)
        {
          exportedRoutes.push(route);
        }
      }
    });

    if(appmodule.children)
    { 
     console.log(appmodule.children);
       for(var i = 0;i<appmodule.children.length;i++)
         exportedRoutes.push(appmodule.children[i])
  
    }
      
      ngModule.declarations = exportedComponents.filter(x=>ngModule.declarations.indexOf(x)>-1);
      ngModule.imports.push(RouterModule.forChild(exportedRoutes))
  }
  
  addChildModule(appmodule,route:Route)
  {
    if(!appmodule.children) 
      appmodule.children=[];
    appmodule.children.push(route);
  }
  fixupSelector(component:any)
  {
    var annotation=  Reflection.getAnnotation(component).filter(x => x.selector)[0]
    annotation.selector = "exclude-"+annotation.selector;
  }

  registerRoute(route:Route)
  {
    this.routes.push(route);
  }

  getTenantByName(name: any): ITenant { 
    var found=this.tenants.filter(x=>x.getName()==name);
    var tenant=null;
    if(found.length==0)
    {
      tenant =new TenantRegistration(this.defaultTenant,name); 
      this.tenants.push(tenant);
    }
    else
      tenant=found[0];
    return tenant;
  }

  getTenantByComponent(component: any): ITenant {
    var found=this.tenants.filter(x=>x.getComponents().filter(y=>y==component).length>0); 
    if(found.length==0) 
      return null
    else
     return found[0]; 
  }

  getDefaultTenant(){
    return this.defaultTenant;
  }

  getCurrentTenant(): ITenant {
    if (window.location.toString().indexOf("?gg") > 0) {
     return this.getTenantByName("pruvit");
    }
    else
     return this.getTenantByName("default");
  }
}
class TenantRegistration implements ITenant{

  private routes:Route[];

  private components:any[];

  constructor(private defaultTenant:ITenant,private name:string){
      this.routes=[];
      this.components=[];
  }

  getName(): string {
   return this.name;
  }

  registerComponent(component: any) {
    if(this.components.indexOf(component)==-1)
       this.components.push(component);
  }

  getComponents(): any[] {
    return this.components; 
  }
}

var MultiTenantService = new NewMultitenantService();

export function MultitenantModule(target) {
 
  var ngModule = <NgModule>(Reflection.getAnnotation(target)[0]); 
  MultiTenantService.exportMainModule(target,ngModule); 
}
export function MultitenantLazyModule(target){
   
  var ngModule = <NgModule>(Reflection.getAnnotation(target)[0]); 
  MultiTenantService.exportChildModule(target,ngModule);
}

export function RegisterChildModule(route:Route){
  return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    MultiTenantService.addChildModule(target,route);
 };
}

function Tenant(tenant?: string, route?:Route) {
  return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) { 
    var tenantInstnace = MultiTenantService.getDefaultTenant();
    if(tenant)
      tenantInstnace = MultiTenantService.getTenantByName(tenant)
      
    if(route)
      route.component=target;
    tenantInstnace.registerComponent(target);
  };
}
function Path(path) {
  return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    MultiTenantService.registerRoute({
      path:path,
      component:target
    })
  };
}
function Route(route: Route) {
  return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if(!route.component)
      route.component=target;
    MultiTenantService.registerRoute(route);
  };
}
export { MultiTenantService };
export { Tenant };
export { Path,Route };