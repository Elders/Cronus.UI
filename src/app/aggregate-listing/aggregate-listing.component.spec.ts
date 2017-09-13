import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AggregateListingComponent } from './aggregate-listing.component';

describe('AggregateListingComponent', () => {
  let component: AggregateListingComponent;
  let fixture: ComponentFixture<AggregateListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
