import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionListingComponent } from './projection-listing.component';

describe('ProjectionListingComponent', () => {
  let component: ProjectionListingComponent;
  let fixture: ComponentFixture<ProjectionListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
