import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCredentialsComponent } from './client-credentials.component';

describe('ClientCredentialsComponent', () => {
  let component: ClientCredentialsComponent;
  let fixture: ComponentFixture<ClientCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
