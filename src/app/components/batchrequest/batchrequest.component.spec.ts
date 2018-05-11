import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchrequestComponent } from './batchrequest.component';

describe('BatchrequestComponent', () => {
  let component: BatchrequestComponent;
  let fixture: ComponentFixture<BatchrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
