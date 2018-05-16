import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingreqComponent } from './fillingreq.component';

describe('FillingreqComponent', () => {
  let component: FillingreqComponent;
  let fixture: ComponentFixture<FillingreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillingreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
