import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStatisticComponent } from './activity-statistic.component';

describe('ActivityStatisticComponent', () => {
  let component: ActivityStatisticComponent;
  let fixture: ComponentFixture<ActivityStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
