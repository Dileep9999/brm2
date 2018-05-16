import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrequestComponent } from './rmrequest.component';

describe('RmrequestComponent', () => {
  let component: RmrequestComponent;
  let fixture: ComponentFixture<RmrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
