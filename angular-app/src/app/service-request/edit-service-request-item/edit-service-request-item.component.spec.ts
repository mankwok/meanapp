import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceRequestItemComponent } from './edit-service-request-item.component';

describe('EditServiceRequestItemComponent', () => {
  let component: EditServiceRequestItemComponent;
  let fixture: ComponentFixture<EditServiceRequestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServiceRequestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
