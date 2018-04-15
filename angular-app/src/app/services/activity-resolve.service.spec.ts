import { TestBed, inject } from '@angular/core/testing';

import { ActivityResolveService } from './activity-resolve.service';

describe('ActivityResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityResolveService]
    });
  });

  it('should be created', inject([ActivityResolveService], (service: ActivityResolveService) => {
    expect(service).toBeTruthy();
  }));
});
