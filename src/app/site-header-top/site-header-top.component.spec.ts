import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHeaderTopComponent } from './site-header-top.component';

describe('SiteHeaderTopComponent', () => {
  let component: SiteHeaderTopComponent;
  let fixture: ComponentFixture<SiteHeaderTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteHeaderTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteHeaderTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
