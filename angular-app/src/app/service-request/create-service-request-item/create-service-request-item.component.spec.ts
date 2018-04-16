import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceRequestItemComponent } from './create-service-request-item.component';

describe('CreateServiceRequestItemComponent', () => {
  let component: CreateServiceRequestItemComponent;
  let fixture: ComponentFixture<CreateServiceRequestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServiceRequestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServiceRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
