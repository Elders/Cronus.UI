import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { SiteHeaderTopComponent } from './site-header-top/site-header-top.component';
import { LeftSidebarMenuComponent } from './left-sidebar-menu/left-sidebar-menu.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, Angular2FontawesomeModule ],
      declarations: [ AppComponent, SiteHeaderTopComponent, LeftSidebarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  //it('should have expected <h1> text', () => {
 //   fixture.detectChanges();
  //  const h1 = de.nativeElement;
  //  expect(h1.innerText).toMatch(/angular/i,
    //  '<h1> should say something about "Angular"');
  //});
});
