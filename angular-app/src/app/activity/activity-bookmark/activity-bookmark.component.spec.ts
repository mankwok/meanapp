import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBookmarkComponent } from './activity-bookmark.component';

describe('ActivityBookmarkComponent', () => {
  let component: ActivityBookmarkComponent;
  let fixture: ComponentFixture<ActivityBookmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBookmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
