import { TestBed, inject } from '@angular/core/testing';

import { PostResolveService } from './post-resolve.service';

describe('PostResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostResolveService]
    });
  });

  it('should be created', inject([PostResolveService], (service: PostResolveService) => {
    expect(service).toBeTruthy();
  }));
});
