import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarMenuComponent } from './left-sidebar-menu.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

describe('LeftSidebarMenuComponent', () => {
  let component: LeftSidebarMenuComponent;
  let fixture: ComponentFixture<LeftSidebarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSidebarMenuComponent ],
      imports: [ Angular2FontawesomeModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
