import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectionDetailComponent } from './projection-detail.component';
import { HttpClientModule} from '@angular/common/http';

describe('ProjectionDetailComponent', () => {
  let component: ProjectionDetailComponent;
  let fixture: ComponentFixture<ProjectionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, FormsModule, RouterTestingModule, HttpClientModule ],
      declarations: [ ProjectionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
