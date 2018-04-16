import { TestBed, inject } from '@angular/core/testing';

import { RequestItemResolveService } from './request-item-resolve.service';

describe('RequestItemResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestItemResolveService]
    });
  });

  it('should be created', inject([RequestItemResolveService], (service: RequestItemResolveService) => {
    expect(service).toBeTruthy();
  }));
});
