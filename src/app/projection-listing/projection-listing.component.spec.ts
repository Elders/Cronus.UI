import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectionListingComponent } from './projection-listing.component';

describe('ProjectionListingComponent', () => {
  let component: ProjectionListingComponent;
  let fixture: ComponentFixture<ProjectionListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgxPaginationModule, RouterTestingModule, HttpModule  ],
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
