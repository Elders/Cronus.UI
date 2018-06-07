import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AggregateListingComponent } from './aggregate-listing.component';

describe('AggregateListingComponent', () => {
  let component: AggregateListingComponent;
  let fixture: ComponentFixture<AggregateListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, Angular2FontawesomeModule, HttpModule, RouterTestingModule, HttpClientModule ],
      declarations: [ AggregateListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
