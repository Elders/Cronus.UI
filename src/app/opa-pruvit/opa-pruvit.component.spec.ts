import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpaPruvitComponent } from './opa-pruvit.component';

describe('OpaPruvitComponent', () => {
  let component: OpaPruvitComponent;
  let fixture: ComponentFixture<OpaPruvitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpaPruvitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpaPruvitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
