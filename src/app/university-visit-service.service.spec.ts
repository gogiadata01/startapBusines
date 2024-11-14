import { TestBed } from '@angular/core/testing';

import { UniversityVisitServiceService } from './university-visit-service.service';

describe('UniversityVisitServiceService', () => {
  let service: UniversityVisitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityVisitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
