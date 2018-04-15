import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveServiceRequestComponent } from './approve-service-request.component';

describe('ApproveServiceRequestComponent', () => {
  let component: ApproveServiceRequestComponent;
  let fixture: ComponentFixture<ApproveServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveServiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
