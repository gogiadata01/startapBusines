import { TestBed } from '@angular/core/testing';

import { UniversityProgramVisitService } from './university-program-visit.service';

describe('UniversityProgramVisitService', () => {
  let service: UniversityProgramVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityProgramVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
