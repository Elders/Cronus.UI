import { NgModule, ReflectiveInjector } from '@angular/core';
import { Reflection } from './ng-reflection';

class MultitenantServiceRegistrations {
  components: [{ component: any, tenant: string, path: string }];
  constructor() {
  }
  getComponentTenant(component) {
    if (!this.components)
      return "default";
    var found = this.components.filter(x => x.component == component);
    if (found.length == 0)
      return "default"
    else
      return found[0].tenant;
  }
  registerTenant(component, tenant) {
    var registration = {
      component: component,
      tenant: tenant,
      path: null,
    }
    if (!this.components) {
      this.components = [registration];
    }
    else {
      var current = this.components.filter(x => x.component == component);
      if (current.length == 0)
        this.components.push(registration);
      else {
        current[0].tenant = tenant;
      }
    }
  }

  registerPath(component, path) {
    var registration = {
      component: component,
      tenant: "default",
      path: path,
    }
    if (!this.components) {
      this.components = [registration];
    }
    else {
      var current = this.components.filter(x => x.component == component);
      if (current.length == 0)
        this.components.push(registration);
      else {
        current[0].path = path;
      }
    }
  }
  getRegistrations(): [{ component: any, tenant: string, path: string }] {
    var components = [];
    var tenant = this.getTenant();
    this.components.forEach(element => {
      if (element.tenant == tenant)
        components.push(element);
    });
    return this.components;
  }
  getRegistrationsAsComponents(): any[] {
    var components = [];
    var tenant = this.getTenant();

    this.components.forEach(element => {
      if (element.tenant == tenant)
        components.push(element);
    });
    return components;
  }

  compoennetSelctors: [{ selector: string, components: any[] }];
  registerComponentSelector(component: any) {

    var componentAnotation = Reflection.getAnnotation(component).filter(x => x.selector)[0];
    var selector = componentAnotation.selector;
    if (!this.compoennetSelctors) {
      this.compoennetSelctors = [{ selector: selector, components: [component] }]
    }
    else {
      var found = this.compoennetSelctors.filter(x => x.selector == selector);
      if (found.length == 0)
        this.compoennetSelctors.push({ selector: selector, components: [component] })
      else
        found[0].components.push(component);
    }
  }

  getBootModules(allModules: any[]): any[] {
    var currentTenenat = this.getTenant();
    allModules.forEach(mod => {
      var moduleTenant = this.getComponentTenant(mod);
      this.registerTenant(mod, moduleTenant);
      this.registerComponentSelector(mod);
    })
    this.compoennetSelctors.forEach(element => {
      if (element.components.length > 1) {
        element.components.forEach(c => {
          if (this.getComponentTenant(c) != currentTenenat) {
            var componentAnotation = Reflection.getAnnotation(c).filter(x => x.selector)[0];
            componentAnotation.selector = this.getComponentTenant(c) + "-" + componentAnotation.selector;
          }
        });
      }
    });
    return allModules;
  }

  getRoutes(): any[] {
    var currentTenenat = this.getTenant();
    var result = [];
    var routes = {};
    this.components.forEach(x => {
      if (!routes[x.path]) {
        routes[x.path]={ components :[]}; 
      }
      routes[x.path].components.push(x);
    }) 
    for (var key in routes) {
      var found = routes[key].components[0].component;
      if (routes[key].components.length > 1) {

        routes[key].components.forEach(c => {
          if (c.tenant == currentTenenat) {
            found = c.component;
          }
        });
      }
      result.push({ path: key, component: found });
    }
    return result;
  }
  getTenant() {
    if (window.location.toString().indexOf("gg") > 0) {
      return "pruvit";
    }
    else
      return "default";
  }
}

var MultitenantService = (new MultitenantServiceRegistrations());

export function MultitenantModule(target) {

  var ngModule = <NgModule>(Reflection.getAnnotation(target)[0]);

  ngModule.declarations = MultitenantService.getBootModules(ngModule.declarations);

}
function Tenant(tenant: string) {

  return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    MultitenantService.registerTenant(target, tenant);
  };
}
function Path(path: string) {
  return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    MultitenantService.registerPath(target, path);
  };
}
export { MultitenantService };
export { Tenant };
export { Path };
