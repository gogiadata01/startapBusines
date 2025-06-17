import { TestBed } from '@angular/core/testing';

import { UniCardEngService } from './uni-card-eng.service';

describe('UniCardEngService', () => {
  let service: UniCardEngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniCardEngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
